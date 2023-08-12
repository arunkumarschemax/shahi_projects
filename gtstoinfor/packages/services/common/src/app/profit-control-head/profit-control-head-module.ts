import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfitColtrolHeadAdapter } from './dto/profit-control-head.adapter';
import { ProfitControlHead } from './profit-control-head-entity';
import { ProfitControlHeadController } from './profit-control-head.controller';
import { ProfitControlHeadService } from './profit-control-head.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfitControlHead]),
        ],
        controllers: [ProfitControlHeadController],
        providers: [ProfitControlHeadService,ProfitColtrolHeadAdapter,ApplicationExceptionHandler]
      })
export class ProfitControlHeadModule{
    
}