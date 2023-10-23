import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitColtrolHeadAdapter } from '../profit-control-head/dto/profit-control-head.adapter';
import { HierarchyLevel } from './hirerachy-level-entity';
import { HierachyLevelController } from './hirerachy-level-controller';
import { HierachyLevelService } from './hirerachy-level-service';





@Module({
    imports: [
        TypeOrmModule.forFeature([HierarchyLevel]),
        ],
        controllers: [HierachyLevelController],
        providers: [HierachyLevelService,ApplicationExceptionHandler]
      })
export class HierachyLevelModule{
    
}