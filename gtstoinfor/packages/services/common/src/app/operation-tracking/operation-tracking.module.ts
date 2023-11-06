import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { OperationIssuingController } from './operation-tracking.controller';
import { OperationTrackingService } from './operation-tracking.service';
import { OperationSequence } from '../operation-sequence/operation-sequence.entity';
import { Style } from '../style/dto/style-entity';
import { OperationTracking } from './entity/operation-tracking-entity';
import { OperationInventory } from './entity/operation-inventory-entity';
import { OperationInventoryRepository } from './repo/operation-inventory-repository';
import { OperationTrackingRepository } from './repo/operation-tracking-repository';
import { StyleRepository } from '../style/dto/style-repo';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([OperationTracking,OperationInventory,OperationSequence,Style]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [OperationIssuingController],
  providers: [OperationTrackingService,ApplicationExceptionHandler,OperationInventoryRepository,OperationTrackingRepository,StyleRepository],
  exports: [OperationTrackingService],
})
export class OperationTrackingModule {}
