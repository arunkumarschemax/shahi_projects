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

@Module({
    imports: [
        TypeOrmModule.forFeature([Indent,IndentFabricEntity,IndentTrimsEntity]),
      ],
      providers: [ApplicationExceptionHandler,IndentRepository,IndentService,IndentAdapter],
      controllers: [IndentController],
      exports: []
})
export class IndentModule { }