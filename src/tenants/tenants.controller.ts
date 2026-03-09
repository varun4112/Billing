import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { register } from 'module';
import { registerDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { updateTenantStatusDto } from './dto/updateTenantStatus.dto';

@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenantService: TenantsService) { }

    @Post('register')
    register(
        @Body() registerDto: registerDto,
    ){
        return this.tenantService.register(registerDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-tenant-status')
    updateTenantStatus(
        @Body() updateTenantStatusDto: updateTenantStatusDto,
        @Req () req:any
    ){
        return this.tenantService.updateTenantStatus(updateTenantStatusDto, req)
    }

}
