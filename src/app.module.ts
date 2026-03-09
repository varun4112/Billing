import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { BillingModule } from './billing/billing.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';

@Module({
  imports: [
    AuthModule,
    TenantsModule,
    RolesModule,
    PermissionsModule,
    BillingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }), PrismaModule,],
  controllers: [AppController, UsersController, TenantsController],
  providers: [AppService, UsersService, TenantsService],
})
export class AppModule { }
