import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { variety } from './variety-entity';
import { VarietyController } from './variety-controller';
import { varietyService } from './variety-services';
import { VarietyAdapter } from './dto/variety-adapter';
import { CategoryMappingEntity } from '../../m3-trims/m3-trims-category-mapping.entity';
import { M3TrimsCategoryMappingRepo } from '../../m3-trims/m3-trims-category-mapping.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([variety,CategoryMappingEntity]),
  ],
  controllers: [VarietyController],
  providers: [varietyService,VarietyAdapter,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class varietyModule {}
