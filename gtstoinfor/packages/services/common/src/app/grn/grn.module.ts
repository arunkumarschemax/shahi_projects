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
import { PurchaseOrderFbricEntity } from '../purchase-order/entities/purchase-order-fabric-entity';
import { PurchaseOrderTrimEntity } from '../purchase-order/entities/purchase-order-trim-entity';
import { PurchaseOrderEntity } from '../purchase-order/entities/purchase-order-entity';
import { IndentRepository } from '../indent/dto/indent-repository';
import { Indent } from '../indent/indent-entity';
import { FabricIndentRepository } from '../indent/dto/fabric-indent-repository';
import { IndentFabricEntity } from '../indent/indent-fabric-entity';
import { TrimIndentRepository } from '../indent/dto/trim-indent-repository';
import { IndentTrimsEntity } from '../indent/indent-trims-entity';
import { PurchaseOrderItemsEntity } from '../purchase-order/entities/purchase-order-items-entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([GrnEntity,GrnFabricEntity,GrnTrimsEntity,GrnItemsEntity,PurchaseOrderFbricEntity,PurchaseOrderTrimEntity,PurchaseOrderEntity,Indent,IndentFabricEntity,IndentTrimsEntity,PurchaseOrderItemsEntity]),
      ],
      providers: [ApplicationExceptionHandler,GrnRepository,GrnService,GrnAdapter,IndentRepository,FabricIndentRepository,TrimIndentRepository],
      controllers: [GrnController],
      exports: []
})
export class GrnModule { }