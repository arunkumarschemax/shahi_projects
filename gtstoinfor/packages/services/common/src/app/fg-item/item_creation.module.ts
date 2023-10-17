import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemCreation } from './item_creation.entity';
import { ItemCreationController } from './item_creation.controller';
import { ItemCreationService } from './item_creation.service';
import { ItemCreationAdapter } from './dto/item_creation.adapter';
import { ItemSkus } from '../sku-generation/sku-generation.entity';
import { StyleOrder } from '../style-order/style-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemCreation]),
  ],
  controllers: [ItemCreationController],
  providers: [ItemCreationService,ItemCreationAdapter,ApplicationExceptionHandler,ItemSkus,StyleOrder],
  exports:[]
})
export class ItemCreationModule {}
