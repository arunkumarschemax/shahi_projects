import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { StyleOrder } from './style-order.entity';
import { StyleOrderService } from './style-order.service';
import { StyleOrderController } from './style-order.controller';
import { CoLine } from './co-line.entity';
import { StyleOrderRepository } from './style-order-repo';


@Module({
    imports: [
        TypeOrmModule.forFeature([StyleOrder,CoLine
        ]),
      ],
      providers: [ApplicationExceptionHandler,StyleOrderService,StyleOrderRepository],
      controllers: [StyleOrderController],
      exports: []
})
export class StyleOrderModule { }