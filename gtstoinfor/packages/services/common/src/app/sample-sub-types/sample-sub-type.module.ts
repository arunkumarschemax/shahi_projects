import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { SampleSubTypes } from './sample-sub-types.entity';
import { SampleTypes } from '../sample Types/sample-types.entity';
import { SampleSubTypesController } from './sample-sub-types.controller';
import { SampleSubTypesService } from './sample-sub-types.service';
import { SampleSubTypeAdapter } from './dto/sample-sub-types.adapter';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([SampleSubTypes,SampleTypes]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [SampleSubTypesController],
  providers: [SampleSubTypesService,SampleSubTypeAdapter,ApplicationExceptionHandler],
  exports: [SampleSubTypesService],
})
export class SampleSubTypesModule {}
