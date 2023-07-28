import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { OperationGroups } from './operation-groups.entity';
import { OperationGroupsAdapter } from './dto/operation-groups.adapter';
import { OperationGroupsController } from './opeartion-groups.controller';
import { OperationGroupsService } from './operation-groups.service';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([OperationGroups]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [OperationGroupsController],
  providers: [OperationGroupsService,OperationGroupsAdapter,ApplicationExceptionHandler],
  exports: [OperationGroupsService],
})
export class OperationGroupsModule {}
