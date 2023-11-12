import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { LocationEntity } from './location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationAdapter } from './dto/location.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity]),
  ],
  controllers: [LocationController],
  providers: [LocationService,LocationAdapter,ApplicationExceptionHandler]
})
export class LocationsModule {}
