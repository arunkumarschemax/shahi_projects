import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import {Countries} from './countries.entity';
import {CountriesAdapter} from './dto/countries.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';


@Module({
  imports: [
    
    TypeOrmModule.forFeature([Countries]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [CountriesController],
  providers: [CountriesService,CountriesAdapter,ApplicationExceptionHandler],
  exports: [CountriesService],
})
export class CountriesModule {}
