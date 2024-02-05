import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService,ApplicationExceptionHandler]
})
export class ProductModule {}