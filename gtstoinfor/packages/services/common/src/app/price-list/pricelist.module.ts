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

@Module({
  providers: [priceListService, ApplicationExceptionHandler,pricListRepository,PriceListAdapter],
  imports: [
    TypeOrmModule.forFeature([
        PriceListEntity
  ])],
  controllers: [PriceListController],
  exports:[priceListService]
})
export class PriceListModule { }
