import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FeatureEntity } from './entities/feature.entity';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { FeatureRepository } from './repo/feature-repository';
import { FeatureOptionEntity } from './entities/feature-option-entity';
import { FeatureOpitionRepository } from './repo/feature-option-repository';
import { ColourService, DestinationService, SizeService } from '@project-management-system/shared-services';

@Module({
  imports: [
  TypeOrmModule.forFeature([FeatureEntity, FeatureOptionEntity]),
],
  controllers: [FeatureController],
  providers: [FeatureService,ApplicationExceptionHandler,FeatureRepository,FeatureOpitionRepository,ColourService,SizeService,DestinationService]
})
export class FeatureModule {}