import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricSubTypeAdapter } from './dto/fabric-sub-type.adapter';
import { FabricsubTypeController } from './fabric-sub-type.controller';
import { FabricSubTypeService } from './fabric-sub-type.service';
import { FabricSubType } from './fabric-sub-type.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
      TypeOrmModule.forFeature([FabricSubType]),
    ],
    controllers: [FabricsubTypeController],
    providers: [FabricSubTypeService,FabricSubTypeAdapter,ApplicationExceptionHandler],
    exports:[FabricSubTypeService]
  })
  export class FabricSubTypeModule {}
  