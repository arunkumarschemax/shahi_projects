import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import {VendorsAdapter} from './dto/vendors.adapter';
import { Vendors } from './vendors.entity'
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Vendors]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [VendorsController],
  providers: [VendorsService,VendorsAdapter,ApplicationExceptionHandler],
  exports: [VendorsService],
})
export class VendorsModule {}
