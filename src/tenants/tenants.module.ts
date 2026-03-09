import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[PrismaModule, PassportModule, JwtModule.register({
    secret: 'supersecret',
    signOptions: { expiresIn: '1d' },
  }),],
  providers: [TenantsService,JwtStrategy],
  controllers: [TenantsController],
  exports: [JwtModule],
})
export class TenantsModule {}
