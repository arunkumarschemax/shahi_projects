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
import { MaterialFabricRepository } from '../material-issue/repo/material-fabric-repository';
import { MaterialFabricEntity } from '../material-issue/entity/material-fabric-entity';
import { SampleRequestRepository } from '../sample-dev-request/repo/sample-dev-req-repo';
import { SampleRequest } from '../sample-dev-request/entities/sample-dev-request.entity';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([OperationTracking,OperationInventory,OperationSequence,Style,MaterialFabricEntity,SampleRequest]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [OperationIssuingController],
  providers: [OperationTrackingService,ApplicationExceptionHandler,OperationInventoryRepository,OperationTrackingRepository,StyleRepository,MaterialFabricRepository,SampleRequestRepository],
  exports: [OperationTrackingService],
})
export class OperationTrackingModule {}
