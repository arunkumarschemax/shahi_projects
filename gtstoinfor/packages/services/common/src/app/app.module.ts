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
import { EmployeeDetailsModule } from './employee-details/employee-details-module';
import { ItemsModule } from './items/items.module';
import { VendorsModule } from './vendors/vendors.module';
import { BuyersModule } from './buyers/buyers.module';
import { DeliveryMethodModule } from './delivery-method/delivery-method.module';
import { ItemCategoriesModule } from './item-categories/item-categories.module';
import { ItemSubCategoriesModule } from './item-sub-categories/item-sub-categories.module';
import { DeliveryTermsModule } from './delivery-terms/delivery-terms.module';


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
        connectionLimit: 20
      }
    }),
    FactoriesModule,
    CurrenciesModule,
    MasterBrandsModule,
    OperationsModule,
    DeliveryMethodModule,
    ItemCategoriesModule,
    ItemSubCategoriesModule,
    UsersModule,
    OrdersModule,
    DeliveryTermsModule,
    AuthModule, JwtModule,EmployeeDetailsModule,ItemsModule,VendorsModule,BuyersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
