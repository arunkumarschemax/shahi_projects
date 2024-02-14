import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {  LocationsEntity } from './master-locations.entity';
import { MasterLocationsController } from './master-locations.controller';
import { MasterLocationsService } from './master-locations.service';
import { MasterLocationsAdapter } from './dto/master-locations.adapter';
 
@Module({
  imports: [
    
    TypeOrmModule.forFeature([LocationsEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [MasterLocationsController],
  providers: [MasterLocationsService,MasterLocationsAdapter,ApplicationExceptionHandler],
  exports: [MasterLocationsService],
})
export class MasterLocationsModule {}
