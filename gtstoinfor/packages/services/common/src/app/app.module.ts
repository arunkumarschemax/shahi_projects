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
import { LocationsModule } from './locations/location.module';
import { GarmentsModule } from './garments/garments.module';
import { AttributeModule } from './attributes/attribute.module';
import { ComponentsModule } from './components/components.module';
import { GarmentCategoriesModule } from './garment-category/garment-category.module';
import { ComponentMappingModule } from './components-mapping/component-mapping.module';
import { ProfitControlHeadModule } from './profit-control-head/profit-control-head-module';
import { TaxesModule } from './taxes/taxes.module';
import { WarehouseModule } from './warehouse/warehouse.module';
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
import { LiscenceTypedModule } from './liscence-type/liscenec-type.module';
import { FabricsModule } from './fabrics/fabrics-module';
import { FabricStructuresModule } from './fabric structure/fabric.module';
import { FabricFinishTypesModule } from './fabric-finish-types/fabric-finish-types.module';
import { UomModule } from './uom/uom.module';
import { BuyersDestinationModule } from './buyers-destination/buyers-destination.module';
import { BomModule } from './bom-trim/bom.module';
import { SettingsModule } from './settings/settings.module';
import { SampleTypesModule } from './sample Types/sample-types.module';
import { SampleSubTypesModule } from './sample-sub-types/sample-sub-type.module';
import { OperationSequenceModule } from './operation-sequence/operation-sequence.module';
import { FabricWeaveModule } from './fabric weave/fabric-weave.module';
import { FabricDevelopmentModule } from './fabric-development-request/fabric-development.module';
import { SkuGenerationModule } from './sku-generation/sku-generation.module';
import { SampleDevReqModule } from './sample-dev-request/sample-dev-request.module';
import { StyleOrderModule } from './style-order/style-order.module';
import { ItemCreationModule } from './fg-item/item_creation.module';
import { ItemGroupModule } from './item-group/item-group.module';
import { GroupTechClassAdapter } from './group-tech-class/dto/group-tech-class.adapter';
import { GroupTechClassModule } from './group-tech-class/group-tech-class.module';
import { BusinessAreaModule } from './business-area/business-area.module';
import { CoTypeModule } from './co-type/co-type.module';
import { CompositionModule } from './composition/composition.module';
import { ProductGroupModule } from './product group/product-group-module';
import { ProcrumentGroupModule } from './procurment group/procurment-group-module';
import { HierachyLevelModule } from './hirerachy level/hirerachy-level-module';
import { RangeModule } from './range/range.module';
import { SearchGrpModule } from './search-group/search-group.module';

import { ItemTypeModule } from './item-type/item-type.module';
import { RmSkusModule } from './rm-skus/rm-skus.module';

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
      logging: false,
      
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
    FabricSubTypeModule,
    FabricTypeModule,
    ColourModule,
    AccountControlObjectModule,
    DepartmentsModule,
    FabricStructuresModule,
    FabricFinishTypesModule,
    SizeModule,
    FabricsModule,
    BuyersModule,
    ColourModule,
    BuyersDestinationModule,
    BomModule,
    ItemGroupModule,
    ProductGroupModule,
    ProcrumentGroupModule,
    HierachyLevelModule,
    AuthModule, JwtModule,EmployeeDetailsModule,ItemsModule,VendorsModule,BuyersModule,CompanyModule,AccountControlObjectModule,OperationGroupsModule,CountriesModule,GarmentCategoriesModule,StyleModule,PaymentMethodModule ,ComponentMappingModule,ProfitControlHeadModule,CountriesModule,GarmentCategoriesModule,StyleModule,ComponentMappingModule,WarehouseModule,TaxesModule,SettingsModule,ColourModule,UomModule,DestinationModule,SampleTypesModule,SampleSubTypesModule,OperationSequenceModule,FabricWeaveModule,FabricDevelopmentModule,SkuGenerationModule,SampleDevReqModule,StyleOrderModule,ItemCreationModule,GroupTechClassModule,BusinessAreaModule,CoTypeModule,CompositionModule,RangeModule,SearchGrpModule,RmSkusModule,ItemTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
