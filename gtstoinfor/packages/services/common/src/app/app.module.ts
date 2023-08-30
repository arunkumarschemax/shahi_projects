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
import { PaymentMethodModule } from './payment-methods/paymeny-method-module';
import { GarmentsModule } from './garments/garments.module';
import { AttributeModule } from './attributes/attribute.module';
import { ComponentsModule } from './components/components.module';
import { GarmentCategoriesModule } from './garment-category/garment-category.module';
import { ComponentMappingModule } from './components-mapping/component-mapping.module';
import { ProfitControlHeadModule } from './profit-control-head/profit-control-head-module';import { TaxesModule } from './taxes/taxes.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { SampleTypesModule } from './sample Types/sample-types.module';
import { LocationsModule } from './locations/location.module';
import { SampleSubTypesModule } from './sample-sub-types/sample-sub-type.module';
import { LiscenceTypedModule } from './liscence-type/liscenec-type.module';
import { DestinationModule } from './destination/destination.module';
import { FabricTypeModule } from './fabric-types/fabric-type.module';
import { FabricSubTypeModule } from './fabric-sub-types/fabric-sub-type.module';
import { SizeModule } from './sizes/sizes-module';
import { CustomGroupsModule } from './custom groups/custom-groups.module';
import { ROSLGroupsModule } from './rosl groups/rosl-groups.module';
import { BuyingHouseModule } from './buying-house/buying-house.module';
import { CommissionModule } from './commission/commission.module';
import { ColourModule } from './colours/colour.module';
import { DepartmentsModule } from './departments/departments.module';
import { AccountControlObjectModule } from './account-control-objects/account-control-object-module';
import { FabricStructuresModule } from './fabric structure/fabric.module';
import { FabricFinishTypesModule } from './fabric-finish-types/fabric-finish-types.module';
import { BuyersDestinationModule } from './buyers-destination/buyers-destination.module';
import { SettingsModule } from './settings/settings.module';
import { BomModule } from './bom-trim/bom.module';


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
      // host:'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'crm',
      autoLoadEntities: true,
      synchronize: true,
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
    LiscenceTypedModule,
    GarmentCategoriesModule,
    ComponentsModule,
    AttributeModule,
    CustomGroupsModule,
    ROSLGroupsModule,
    BuyingHouseModule,
    CommissionModule,
    UsersModule,
    // OrdersModule,
    DeliveryTermsModule,
    LocationsModule,
    DivisionModule,
    SampleTypesModule,
    SampleSubTypesModule,
    LiscenceTypedModule,
    FabricSubTypeModule,
    FabricTypeModule,
    FabricStructuresModule,
    FabricFinishTypesModule,
  SizeModule,
  BuyersModule,
  BuyersDestinationModule,
    AuthModule, JwtModule,EmployeeDetailsModule,ItemsModule,VendorsModule,BuyersModule,CompanyModule,AccountControlObjectModule,OperationGroupsModule,CountriesModule,GarmentCategoriesModule,StyleModule,PaymentMethodModule ,ComponentMappingModule,ProfitControlHeadModule,CountriesModule,GarmentCategoriesModule,StyleModule,ComponentMappingModule,WarehouseModule,TaxesModule,DestinationModule,SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
