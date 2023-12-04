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
import { M3MastersModule } from './m3-masters/m3-masters-module';
import { FabricDevelopmentModule } from './fabric-development-request/fabric-development.module';
import { ItemSkus } from './sku-generation/sku-generation.entity';
import { SkuGenerationModule } from './sku-generation/sku-generation.module';
import { SampleDevReqModule } from './sample-dev-request/sample-dev-request.module';
import { StyleOrderModule } from './style-order/style-order.module';
import { StocksModule } from './stocks/stocks.module';
import { OperationTrackingModule } from './operation-tracking/operation-tracking.module';
import { RackPositionModule } from './rm_locations/rack-position.module';
import { MaterialIssueModule } from './material-issue/material-issue.module';
import { IndentService } from './indent/indent.service';
import { IndentModule } from './indent/indent.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order-module';
import { RacksModule } from './racks/rack.module';
import { LocationMappingModule } from './location-mapping/location-mapping.module';
import { QualityModule } from './quality/quality.module';
import { M3StyleModule } from './m3-style-codes/m3-style.module';
import { GrnModule } from './grn/grn.module';
import { M3ItemsModule } from './m3-items/m3-items.module';
import { M3TrimsModule } from './m3-trims/m3-trims.module';
import { ColumnModule } from './cloumn/column.module';
import { ReclassificationModule } from './reclassification/reclassification.module';
import { LevelModule } from './level/level.module';
import { FinishModule } from './Trim Masters/finish/finish.module';
import { HoleModule } from './Trim Masters/hole/hole.module';
import { CategoryModule } from './Trim Masters/category/category-module';
import { ContentModule } from './Trim Masters/content-master/content-module';
import { varietyModule } from './Trim Masters/variety/variety-module';
import { trimModule } from './Trim Masters/trim/trim-module';
import { ThicknessModule } from './thickness/thickness.module';
import { TypeModule } from './type/type.module';


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
    PurchaseOrderModule,
    RacksModule,
    QualityModule,
    M3StyleModule,
    M3ItemsModule,
    ColumnModule,
    LevelModule,
    ThicknessModule,
    TypeModule,
    CategoryModule,
    ContentModule,
    AuthModule, JwtModule,EmployeeDetailsModule,ItemsModule,VendorsModule,BuyersModule,CompanyModule,AccountControlObjectModule,OperationGroupsModule,CountriesModule,GarmentCategoriesModule,StyleModule,PaymentMethodModule ,ComponentMappingModule,ProfitControlHeadModule,CountriesModule,GarmentCategoriesModule,StyleModule,ComponentMappingModule,WarehouseModule,TaxesModule,SettingsModule,ColourModule,UomModule,DestinationModule,SampleTypesModule,SampleSubTypesModule,OperationSequenceModule,FabricWeaveModule,M3MastersModule,FabricDevelopmentModule,SkuGenerationModule,SampleDevReqModule,StyleOrderModule,OperationTrackingModule,MaterialIssueModule,IndentModule,RackPositionModule,StocksModule,GrnModule,LocationMappingModule,M3TrimsModule,ReclassificationModule,varietyModule,trimModule,FinishModule,HoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
