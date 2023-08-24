import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoriesModule } from './factories/factories.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '../../config';
import { ScheduleModule } from '@nestjs/schedule';
import { DpomModule } from './dpom/nike-dpom.module';
import { SupplierModule } from './supplier/supplier.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      timezone: 'Z',
      host: appConfig.database.host,
      port: appConfig.database.port,
      username: appConfig.database.username,
      password: appConfig.database.password,
      database: appConfig.database.dbName,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      extra: {
        connectionLimit: 20
      }
    }),
    FactoriesModule,
    SupplierModule,
    UsersModule,
    AuthModule, JwtModule, DpomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
