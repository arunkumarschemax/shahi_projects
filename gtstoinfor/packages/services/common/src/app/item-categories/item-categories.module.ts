import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoryAdapter } from './dto/item-categories.adapter';
import { ItemCategoriesController } from './item-categories.controller';
import { ItemCategory } from './item-categories.entity';
import { ItemCategoriesService } from './item-categories.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemCategory]),
  ],
  controllers: [ItemCategoriesController],
  providers: [ItemCategoriesService,ItemCategoryAdapter,ApplicationExceptionHandler],
  exports: [ItemCategoriesService]
})
export class ItemCategoriesModule {}
