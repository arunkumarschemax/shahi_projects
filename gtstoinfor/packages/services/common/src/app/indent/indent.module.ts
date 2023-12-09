import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndentController } from './indent.controller';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Indent } from './indent-entity';
import { IndentService } from './indent.service';
import { IndentRepository } from './dto/indent-repository';
import { IndentFabricEntity } from './indent-fabric-entity';
import { IndentTrimsEntity } from './indent-trims-entity';
import { IndentAdapter } from './dto/indent-adapter';
import { FabricIndentRepository } from './dto/fabric-indent-repository';
import { TrimIndentRepository } from './dto/trim-indent-repository';
import { UomService } from '@project-management-system/shared-services';
import { ColourService } from '../colours/colour.service';
import { Colour } from '../colours/colour.entity';
import { ColourAdapter } from '../colours/dto/colour-adapter';


@Module({
    imports: [
        TypeOrmModule.forFeature([Indent,IndentFabricEntity,IndentTrimsEntity,Colour]),
      ],
providers: [ApplicationExceptionHandler,IndentRepository,FabricIndentRepository,TrimIndentRepository,IndentService,UomService,IndentAdapter,ColourService,ColourAdapter],
      controllers: [IndentController],
      exports: []
})
export class IndentModule { }