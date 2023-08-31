import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FabricStructures } from './fabric.entity';
import { FabricStructuresController } from './fabric.controller';
import { FabricStructuresService } from './fabric.service';
import { FabricStructuresAdapter } from './dto/fabric.adapter';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([FabricStructures]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [FabricStructuresController],
  providers: [FabricStructuresService,FabricStructuresAdapter,ApplicationExceptionHandler],
  exports: [FabricStructuresService],
})
export class FabricStructuresModule {}
