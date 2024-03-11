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
import { BuyerDestinationService, UomService } from '@project-management-system/shared-services';
import { ColourService } from '../colours/colour.service';
import { Colour } from '../colours/colour.entity';
import { ColourAdapter } from '../colours/dto/colour-adapter';
import { M3TrimsCategoryMappingRepo } from '../m3-trims/m3-trims-category-mapping.repo';
import { CategoryMappingEntity } from '../m3-trims/m3-trims-category-mapping.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Indent,IndentFabricEntity,IndentTrimsEntity,Colour,CategoryMappingEntity]),
      ],
providers: [ApplicationExceptionHandler,IndentRepository,FabricIndentRepository,TrimIndentRepository,IndentService,UomService,IndentAdapter,ColourService,ColourAdapter,BuyerDestinationService,M3TrimsCategoryMappingRepo],
      controllers: [IndentController],
      exports: []
})
export class IndentModule { }