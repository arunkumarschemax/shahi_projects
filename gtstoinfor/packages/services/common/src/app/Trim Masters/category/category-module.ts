import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CategoryEntity } from './dto/category-entity';
import { CategoryService } from './category-service';
import { categoryController } from './category-controller';
import { OrdersRepository } from './dto/category-repo';
import { M3TrimsCategoryMappingRepo } from '../../m3-trims/m3-trims-category-mapping.repo';
import { CategoryMappingEntity } from '../../m3-trims/m3-trims-category-mapping.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity,CategoryMappingEntity
        ]),
      ],
      providers: [ApplicationExceptionHandler,OrdersRepository,CategoryService,M3TrimsCategoryMappingRepo],
      controllers: [categoryController],
      exports: []
})
export class CategoryModule { }