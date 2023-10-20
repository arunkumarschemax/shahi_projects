import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitColtrolHeadAdapter } from '../profit-control-head/dto/profit-control-head.adapter';
import { ProcurmentGroup } from './procurment-group-entity';
import { ProcurmentGroupController } from './procurment-group-controller';
import { ProcurmentGroupService } from './procurment-group-service';



@Module({
    imports: [
        TypeOrmModule.forFeature([ProcurmentGroup]),
        ],
        controllers: [ProcurmentGroupController],
        providers: [ProcurmentGroupService,ApplicationExceptionHandler]
      })
export class ProcrumentGroupModule{
    
}