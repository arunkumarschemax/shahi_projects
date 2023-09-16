import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersEntity } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersChildEntity } from './entities/orders-child.entity';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersChildAdapter } from './adapters/orders-child.adapter';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersChildRepository } from './repository/orders-child.repository';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { OrdersDifferenceEntity } from './orders-difference-info.entity';
import { OrderDifferenceRepository } from './repository/order-difference.repository';
import { FileUploadRepository } from './repository/upload.repository';
import { FileUploadEntity } from './entities/upload-file.entity';
import { TrimOrdersEntity } from './entities/trim-orders.entity';
import { TrimOrdersRepository } from './repository/trim.order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,
      OrdersChildEntity,
      OrdersDifferenceEntity,
      FileUploadEntity,
      TrimOrdersEntity,
    ])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersAdapter, OrdersChildAdapter, OrdersRepository, OrdersChildRepository, OrderDifferenceRepository, ApplicationExceptionHandler,FileUploadRepository,TrimOrdersRepository]
})
export class OrdersModule { }
