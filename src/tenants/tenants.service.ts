import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class TenantsService {
    constructor(private readonly prismaService: PrismaService, jwtService: JwtService) { }

    async register(registerDto) {
        try {

            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const result = await this.prismaService.$transaction(async (prisma) => {

                const company = await prisma.tenant.create({
                    data: { name: registerDto.companyName }
                });

                const admin = await prisma.users.create({
                    data: {
                        tenantId: company.id,
                        name: registerDto.adminName,
                        email: registerDto.adminEmail,
                        password: hashedPassword,
                        role: "TENANT_ADMIN"
                    }
                });

                return { company, admin }

            });

            return {
                message: "Tenant created successfully",
                tenantId: result?.company?.id
            }

        } catch (error) {

            if (error.code === 'P2002') {
                throw new BadRequestException("Email or company already exists")
            }

            throw error
        }

    }

    async updateTenantStatus(updateTenantStatusDto, req) {
        console.log("req?.user?.role", req?.user?.role)
        if (req?.user?.role !== 'PLATFORM_ADMIN') {
            throw new ForbiddenException(
                "Unauthorized. Only platform admin can change the status"
            );
        }

        const result = await this.prismaService.tenant.update({
            where: { id: updateTenantStatusDto?.id },
            data: { isActive: updateTenantStatusDto?.isActive }
        })

        return {
            message: "Tenant status updated successfully",
            tenantId: result?.id
        }

    }
}
