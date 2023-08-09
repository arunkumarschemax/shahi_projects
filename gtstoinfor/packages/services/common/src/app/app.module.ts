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
import { CompanyModule } from './company/company.module';

import { PaymentTermsModule } from './payment-terms/payment-terms.module';
import { PackageTermsModule } from './packages-terms/package-terms.module';
import { OperationGroupsModule } from './operation-groups/operation-groups.module';
import { DeliveryMethodModule } from './delivery-method/delivery-method.module';
import { ItemCategoriesModule } from './item-categories/item-categories.module';
import { ItemSubCategoriesModule } from './item-sub-categories/item-sub-categories.module';
import { DivisionModule } from './division/division.module';

import { DeliveryTermsModule } from './delivery-terms/delivery-terms.module';
import { CountriesModule } from './countries/countries.module';
import { StyleModule } from './style/style-module';
import { ProfitCenter } from './profit-center/profit-center-entity';
import { ProfitCenterModule } from './profit-center/profit-center-module';
import { PaymentMethodModule } from './payment-methods/paymeny-method-module';
import { GarmentsModule } from './garments/garments.module';
import { AttributeModule } from './attributes/attribute.module';
import { ComponentsModule } from './components/components.module';
import { GarmentCategoriesModule } from './garment-category/garment-category.module';
import { ComponentMappingModule } from './components-mapping/component-mapping.module';
import { WarehouseModule } from './warehouse/warehouse.module';


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
    PaymentTermsModule,
    PackageTermsModule,
    MasterBrandsModule,
    OperationsModule,
    DeliveryMethodModule,
    ItemCategoriesModule,
    ItemSubCategoriesModule,
    GarmentsModule,
    GarmentCategoriesModule,
    ComponentsModule,
    AttributeModule,
    UsersModule,
    OrdersModule,
    DivisionModule,
    AuthModule, JwtModule,EmployeeDetailsModule,ItemsModule,VendorsModule,BuyersModule,CompanyModule,OperationGroupsModule,CountriesModule,GarmentCategoriesModule,StyleModule,ProfitCenterModule,PaymentMethodModule ,ComponentMappingModule,CountriesModule,GarmentCategoriesModule,StyleModule,ComponentMappingModule,WarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
