import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemSkus } from './sku-generation.entity';
import { ItemSkuService } from './sku-generation.service';
import { ItemSkuController } from './sku-generation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSkus]),
  ],
  controllers: [ItemSkuController],
  providers: [ItemSkuService, ApplicationExceptionHandler],
  exports: [ItemSkuService],
})
export class SkuGenerationModule { }
