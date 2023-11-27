import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Location } from './location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationAdapter } from './dto/location.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
  ],
  controllers: [LocationController],
  providers: [LocationService,LocationAdapter,ApplicationExceptionHandler]
})
export class LocationsModule {}