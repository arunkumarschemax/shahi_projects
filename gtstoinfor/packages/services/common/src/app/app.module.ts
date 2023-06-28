import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoriesController } from './factories/factories.controller';
import { FactoriesModule } from './factories/factories.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import windowsDriver = require('mssql/msnodesqlv8');
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mssql",
      host: "172.25.23.4",
      username: "sa",
      password: "manager@123",
      database: "PRS",
      synchronize: false,
      extra: {
        validateConnection: true,
        trustServerCertificate: true,
      },
      options: {
        cryptoCredentialsDetails: {
          minVersion: "TLSv1",
        },
      }
    }),
    FactoriesModule,
    UsersModule,
    AuthModule, JwtModule],
  controllers: [AppController, FactoriesController, AuthController],
  providers: [AppService, UsersService, AuthService, JwtService],
})
export class AppModule { }
