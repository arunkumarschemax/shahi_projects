import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoriesModule } from './factories/factories.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { appConfig } from '../../config';
import { OrdersModule } from './orders/orders.module';
import { PriceListModule } from './price-list/pricelist.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AddressModule } from './address/address.module';


@Module({
  imports: [
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
        connectionLimit: 100
      }
    }),
    ScheduleModule.forRoot(),
    FactoriesModule,
    UsersModule,
    OrdersModule,
    AuthModule, JwtModule,PriceListModule,AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
