import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { MaterialIssueController } from './material-issue.controller';
import { MaterialIssueService } from './material-issue.service';
import { MaterialIssueEntity } from './entity/material-issue-entity';
import { MaterialFabricEntity } from './entity/material-fabric-entity';
import { MaterialTrimEntity } from './entity/material-trim-entity';
import { MaterialIssueRepository } from './repo/material-issue-repository';
import { MaterialTrimRepository } from './repo/material-trim-repository';
import { MaterialFabricRepository } from './repo/material-fabric-repository';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([MaterialIssueEntity,MaterialFabricEntity,MaterialTrimEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [MaterialIssueController],
  providers: [MaterialIssueService,ApplicationExceptionHandler,MaterialIssueRepository,MaterialTrimRepository,MaterialFabricRepository],
  exports: [MaterialIssueService],
})
export class MaterialIssueModule {}
