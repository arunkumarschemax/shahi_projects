import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FabricFinishTypes } from './fabric-finish-types.entity';
import { FabricFinishTypesController } from './fabric-finish-types.controller';
import { FabricFinishTypesService } from './fabric-finish-types.service';
import { FabricFinishTypesAdapter } from './dto/fabric-finish-types.adapter';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([FabricFinishTypes]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [FabricFinishTypesController],
  providers: [FabricFinishTypesService,FabricFinishTypesAdapter,ApplicationExceptionHandler],
  exports: [FabricFinishTypesService],
})
export class FabricFinishTypesModule {}
