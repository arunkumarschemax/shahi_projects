import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { StyleOrder } from './style-order.entity';
import { StyleOrderService } from './style-order.service';
import { StyleOrderController } from './style-order.controller';
import { OrderLine } from './order-line.entity';
import { StyleOrderRepository } from './style-order-repo';
import { OrderLineRepository } from './order-line.repo';
import { ItemCreation } from '../fg-item/item_creation.entity';
import { CoUpdateRepository } from './co-updates.repo';
import { CoUpdateEntity } from './co-updates.entity';
import { CoLine } from './co-line.entity';
import { CoLineService } from './co-line.service';
import { CoBom } from '../co-bom/co-bom.entity';
import { FgItemBom } from '../substituion/fg-item-bom.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([StyleOrder,OrderLine,CoUpdateEntity,CoLine,CoBom,FgItemBom
        ]),
      ],
      providers: [ApplicationExceptionHandler,StyleOrderService,StyleOrderRepository,OrderLineRepository,ItemCreation,CoUpdateRepository,CoLineService],
      controllers: [StyleOrderController],
      exports: []
})
export class StyleOrderModule { }