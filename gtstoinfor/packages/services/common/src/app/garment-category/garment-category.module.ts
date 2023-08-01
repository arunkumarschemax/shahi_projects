import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { GarmentCategory } from './garment-category.entity';
import { GarmentCategoryAdapter } from './dto/garment-category.adapter';
import { GarmentCategoryService } from './garment-category.service';
import { GarmentCategoriesController } from './garment-category.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([GarmentCategory]),
    ],
    controllers: [GarmentCategoriesController],
    providers: [GarmentCategoryService,GarmentCategoryAdapter,ApplicationExceptionHandler],
    exports: [GarmentCategoryService]
  })
  export class GarmentCategoriesModule {

  }