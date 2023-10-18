import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemSkus } from './sku-generation.entity';
import { ItemSkuService } from './sku-generation.service';
import { ItemSkuController } from './sku-generation.controller';
import { ItemSkuRepository } from './sku-generation-repo';
import { ItemCreation } from '../fg-item/item_creation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSkus]),
  ],
  controllers: [ItemSkuController],
  providers: [ItemSkuService, ApplicationExceptionHandler,ItemSkuRepository,ItemCreation],
  exports: [ItemSkuService],
})
export class SkuGenerationModule { }
