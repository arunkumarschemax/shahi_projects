import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoriesController } from './factories/factories.controller';
import { FactoriesModule } from './factories/factories.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AppDataSource } from './app-datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceModule } from './app-datasource.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "",
      database: "shahi_prs",
      synchronize: true,
      autoLoadEntities: true,
      // extra: {
      //   validateConnection: true,
      //   trustServerCertificate: true,
      // },
      // options: {
      //   cryptoCredentialsDetails: {
      //     minVersion: "TLSv1",
      //   },
      // }
    }),
    FactoriesModule,
    UsersModule,
    AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
