import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CategoryEntity } from './dto/category-entity';
import { CategoryService } from './category-service';
import { categoryController } from './category-controller';
import { OrdersRepository } from './dto/category-repo';


@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity
        ]),
      ],
      providers: [ApplicationExceptionHandler,OrdersRepository,CategoryService],
      controllers: [categoryController],
      exports: []
})
export class CategoryModule { }