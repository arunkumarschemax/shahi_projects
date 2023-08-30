import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleTypes } from './sample-types.entity';
import { SampleTypesController } from './sample-types.controller';
import { SampleTypesService } from './sample-types.service';
import { SampleTypesAdapter } from './dto/sample-types.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';


@Module({
  imports: [
    
    TypeOrmModule.forFeature([SampleTypes]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [SampleTypesController],
  providers: [SampleTypesService,SampleTypesAdapter,ApplicationExceptionHandler],
  exports: [SampleTypesService],
})
export class SampleTypesModule {}
