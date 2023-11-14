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


@Module({
    imports: [
        TypeOrmModule.forFeature([Indent,IndentFabricEntity,IndentTrimsEntity]),
      ],
providers: [ApplicationExceptionHandler,IndentRepository,FabricIndentRepository,TrimIndentRepository,IndentService,UomService,IndentAdapter],
      controllers: [IndentController],
      exports: []
})
export class IndentModule { }