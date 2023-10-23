import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitColtrolHeadAdapter } from '../profit-control-head/dto/profit-control-head.adapter';
import { ProductGroupController } from './product-group-controller';
import { ProductGroup } from './product-group-entity';
import { ProductGroupService } from './product-group-service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductGroup]),
        ],
        controllers: [ProductGroupController],
        providers: [ProductGroupService,ApplicationExceptionHandler]
      })
export class ProductGroupModule{
    
}