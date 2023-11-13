import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FabricStructures } from './fabric-structure.entity';
import { FabricStructuresController } from './fabric-structure.controller';
import { FabricStructuresService } from './fabric-structure.service';
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
