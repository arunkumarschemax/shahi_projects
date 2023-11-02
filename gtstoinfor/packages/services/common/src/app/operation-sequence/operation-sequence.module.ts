import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { OperationSequence } from './operation-sequence.entity';
import { OperationSequenceController } from './operation-sequence.controller';
import { OperationSequenceService } from './operation-sequence.service';
import { OperationGroups } from '../operation-groups/operation-groups.entity';
import { Operations } from '../operations/operation.entity';
import { Item } from '../items/item-entity';
import { OperationSequenceRepository } from './operation-sequence.repository';
import { OperationTracking } from '../operation-issuing/entity/operation-tracking-entity';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([OperationSequence,OperationGroups,Operations,Item,OperationTracking]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [OperationSequenceController],
  providers: [OperationSequenceService,ApplicationExceptionHandler,OperationSequenceRepository],
  exports: [OperationSequenceService],
})
export class OperationSequenceModule {}
