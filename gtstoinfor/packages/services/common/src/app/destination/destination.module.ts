import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { Destination } from './destination.entity';
import { DestinationAdapter } from './dto/destination.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [

    TypeOrmModule.forFeature([Destination]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [DestinationController],
  providers: [DestinationService, DestinationAdapter, ApplicationExceptionHandler],
  exports: [DestinationService],
})
export class DestinationModule { }
