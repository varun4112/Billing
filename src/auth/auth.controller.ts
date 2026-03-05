import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { changePasswordDto } from './dto/changepassword.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    changePassword(
        @Body() changePasswordDto: changePasswordDto,
        @Req() req: RequestWithUser,
    ) {
        return this.authService.changePassword(changePasswordDto, req.user);
    }
}
