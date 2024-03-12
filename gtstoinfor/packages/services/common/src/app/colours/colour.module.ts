import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColourAdapter } from './dto/colour-adapter';
import { Colour } from './colour.entity';
import { ColourController } from './colour.controller';
import { ColourService } from './colour.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyerDestinationService } from '@project-management-system/shared-services';
import { M3TrimsCategoryMappingRepo } from '../m3-trims/m3-trims-category-mapping.repo';
import { CategoryMappingEntity } from '../m3-trims/m3-trims-category-mapping.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Colour,CategoryMappingEntity,CategoryMappingEntity]),
        ],
        controllers: [ColourController],
        providers: [ColourService,ColourAdapter,ApplicationExceptionHandler,BuyerDestinationService,M3TrimsCategoryMappingRepo,M3TrimsCategoryMappingRepo]
      })
export class ColourModule{
    
}