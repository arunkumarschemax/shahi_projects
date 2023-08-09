import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import {Warehouse } from './warehouse.entity';
import {WareHouseAdapter} from './dto/warehouse.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Warehouse]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService,WareHouseAdapter,ApplicationExceptionHandler],
  exports: [WarehouseService],
})
export class WarehouseModule {}
