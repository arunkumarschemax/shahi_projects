import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeAdapter } from './dto/item-type.adapter';
import { ItemTypeEntity } from './item-type.entity';
import { ItemTypeController } from './item-type.controller';
import { ItemTypeService } from './item-type.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Division } from '../division/division.entity';
import { ProductGroup } from '../product group/product-group-entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemTypeEntity,Division,ProductGroup]),
        ],
        controllers: [ItemTypeController],
        providers: [ItemTypeService,ItemTypeAdapter,ApplicationExceptionHandler],
        exports:[ItemTypeService]
      })
export class ItemTypeModule{
}