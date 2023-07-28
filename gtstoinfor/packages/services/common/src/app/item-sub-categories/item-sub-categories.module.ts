import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemSubCategoryAdapter } from './dto/item-sub-category.adapter';
import { ItemSubCategoriesController } from './item-sub-categories.controller';
import { ItemSubCategoriesService } from './item-sub-categories.service';
import { ItemSubCategory } from './item-sub-category.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSubCategory]),
  ],
  controllers: [ItemSubCategoriesController],
  providers: [ItemSubCategoriesService,ItemSubCategoryAdapter,ApplicationExceptionHandler],
  exports:[ItemSubCategoriesService]
})
export class ItemSubCategoriesModule {}
