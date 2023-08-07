import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarmentsAdapter } from './dto/garments.adapter';
import { GarmentsController } from './garments.controller';
import { GarmentsService } from './garments.service';
import { Garments } from './garments.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { GarmentCategory } from '../garment-category/garment-category.entity';
import { ComponentMappingEntity } from '../components-mapping/component-mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Garments,GarmentCategory,ComponentMappingEntity]),
  ],
  controllers: [GarmentsController],
  providers: [GarmentsService,GarmentsAdapter,ApplicationExceptionHandler],
  exports:[GarmentsService]
})
export class GarmentsModule {}
