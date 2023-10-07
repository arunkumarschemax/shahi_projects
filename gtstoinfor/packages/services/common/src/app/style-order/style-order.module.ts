import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { StyleOrder } from './style-order.entity';
import { StyleOrderService } from './style-order.service';
import { StyleOrderController } from './style-order.controller';
import { CoLine } from './co-line.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([StyleOrder,CoLine
        ]),
      ],
      providers: [ApplicationExceptionHandler,StyleOrderService],
      controllers: [StyleOrderController],
      exports: []
})
export class StyleOrderModule { }