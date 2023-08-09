import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfitCenterAdapter } from './dto/profit-center.adapter';
import { ProfitCenter } from './profit-center-entity';
import { ProfitCenterController } from './profit-center.controller';
import { ProfitCenterService } from './profit-center.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfitCenter]),
        ],
        controllers: [ProfitCenterController],
        providers: [ProfitCenterService,ProfitCenterAdapter,ApplicationExceptionHandler]
      })
export class ProfitCenterModule{
    
}