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
import { CurrenciesModule } from './currencies/currencies.module';
import { MasterBrandsModule } from './master-brands/master-brands.module';
import { OperationsModule } from './operations/operations.module';


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
      synchronize: true,
      logging: true,
      extra: {
        connectionLimit: 20
      }
    }),
    FactoriesModule,
    CurrenciesModule,
    MasterBrandsModule,
    OperationsModule,
    UsersModule,
    OrdersModule,
    AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
