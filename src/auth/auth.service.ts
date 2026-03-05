import { BadRequestException, ForbiddenException, Injectable, Module, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { changePasswordDto } from './dto/changepassword.dto';
@Injectable()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async changePassword(dto: changePasswordDto, user: any) {
    const { newPassword, oldPassword } = dto;
    const userId = user.userId;
  
    if (user.role === "PLATFORM_ADMIN") {
      throw new ForbiddenException(
        "Platform admin password cannot be changed, contact your tech team"
      );
    }
  
    const userDetails = await this.prismaService.users.findUnique({
      where: { id: userId },
    });
  
    if (!userDetails) {
      throw new UnauthorizedException("User not found");
    }
  
    const isMatch = await bcrypt.compare(oldPassword, userDetails.password);
  
    if (!isMatch) {
      throw new BadRequestException("Invalid old password");
    }
  
    const samePassword = await bcrypt.compare(newPassword, userDetails.password);
  
    if (samePassword) {
      throw new BadRequestException("New password cannot be same as old password");
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    await this.prismaService.users.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  
    return {
      message: "Password changed successfully",
    };
  }
}
