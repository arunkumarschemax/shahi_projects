import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../app-datasource';
import { AppDataSourceModule } from '../app-datasource.module';
import { priceListService } from './pricelist.service';
import { pricListRepository } from './repository/pricelist.repositiry';
import { PriceListAdapter } from './adapters/pricelist.adapter';
import { PriceListEntity } from './entities/pricelist.entity';
import { PriceListController } from './pricelist.controller';
import { PriceListExcelAdapter } from './adapters/excel-price-list.adapter';
import { UploadPriceListEntity } from './entities/upload-price-list-entity';
import { UploadPriceListRepository } from './repository/upload-price-list-repository';
import { PriceListChildEntity } from './entities/price-list-child-entity';
import { PriceListChildExcelAdapter } from './adapters/excel-price-list-child.adapter';
import { PriceListChildRepository } from './repository/price-list-child-repo';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PriceListEntity,UploadPriceListEntity,PriceListChildEntity
    ])],
  controllers: [PriceListController],
  providers: [priceListService, ApplicationExceptionHandler,UploadPriceListRepository,pricListRepository,PriceListAdapter,PriceListChildExcelAdapter,PriceListChildRepository,PriceListExcelAdapter]
})
export class PriceListModule { }