import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { UomEntity } from './uom-entity';
import { UomController } from './uoms.controller';
import { UomService } from './uom.service';
import { UomRepository } from './dto/uom.repository';
import { CategoryMappingEntity } from '../m3-trims/m3-trims-category-mapping.entity';
import { M3TrimsCategoryMappingRepo } from '../m3-trims/m3-trims-category-mapping.repo';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([UomEntity,CategoryMappingEntity]),
  ],
  controllers: [UomController],
  providers: [UomService,ApplicationExceptionHandler,UomRepository,M3TrimsCategoryMappingRepo]
})
export class UomModule {}
