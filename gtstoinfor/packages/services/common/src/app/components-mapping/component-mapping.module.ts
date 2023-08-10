import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ComponentMappingEntity } from './component-mapping.entity';
import { ComponentMappingController } from './component-mapping.controller';
import { ComponentMappingService } from './component-mapping.service';
import { Garments } from '../garments/garments.entity';
import { GarmentCategory } from '../garment-category/garment-category.entity';
import { Style } from '../style/dto/style-entity';
import { ComponentMappingRepository } from './component-mapping-repo';
import { Components } from '../components/components.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentMappingEntity,Garments,Style,GarmentCategory,Components]),
  ],
  controllers: [ComponentMappingController],
  providers: [ComponentMappingService,ApplicationExceptionHandler,ComponentMappingRepository]
})
export class ComponentMappingModule {}
