import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { GrnFabricEntity } from './entities/grn-fabric-entity';
import { GrnController } from './grn.controller';
import { GrnTrimsEntity } from './entities/grn-trims.entity';
import { GrnRepository } from './dto/grn-repository';
import { GrnEntity } from './entities/grn-entity';
import { GrnService } from './grn.service';
import { GrnAdapter } from './dto/grn-adapter';
import { GrnItemsEntity } from './entities/grn-items-entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([GrnEntity,GrnFabricEntity,GrnTrimsEntity,GrnItemsEntity]),
      ],
      providers: [ApplicationExceptionHandler,GrnRepository,GrnService,GrnAdapter],
      controllers: [GrnController],
      exports: []
})
export class GrnModule { }