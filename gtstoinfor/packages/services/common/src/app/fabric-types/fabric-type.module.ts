import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricTypeAdapter } from './dto/fabric-type.adapter';
import { FabricTypeController } from './fabric-type.controller';
import { FabricTypeService } from './fabric-type.service';
import { FabricType } from './fabric-type.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
      TypeOrmModule.forFeature([FabricType]),
    ],
    controllers: [FabricTypeController],
    providers: [FabricTypeService,FabricTypeAdapter,ApplicationExceptionHandler],
    exports:[FabricTypeModule]
  })
  export class FabricTypeModule {}