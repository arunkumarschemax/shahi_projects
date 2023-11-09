import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { StyleOrder } from './style-order.entity';
import { StyleOrderService } from './style-order.service';
import { StyleOrderController } from './style-order.controller';
import { CoLine } from './order-line.entity';
import { StyleOrderRepository } from './style-order-repo';
import { CoLineRepository } from './order-line.repo';
import { ItemCreation } from '../fg-item/item_creation.entity';
import { CoUpdateRepository } from './co-updates.repo';
import { CoUpdateEntity } from './co-updates.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([StyleOrder,CoLine,CoUpdateEntity
        ]),
      ],
      providers: [ApplicationExceptionHandler,StyleOrderService,StyleOrderRepository,CoLineRepository,ItemCreation,CoUpdateRepository],
      controllers: [StyleOrderController],
      exports: []
})
export class StyleOrderModule { }