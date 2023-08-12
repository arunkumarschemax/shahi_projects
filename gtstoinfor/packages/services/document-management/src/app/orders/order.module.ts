
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/order.entity';
import { FileUploadEntity } from './entities/file-upload.entity';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { OrdersAdapter } from './adapters/order.adapter';
import { OrdersRepository } from './repositories/order.repository';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FileUploadRepository } from './repositories/upload.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,FileUploadEntity
    ])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersAdapter, OrdersRepository, ApplicationExceptionHandler,FileUploadRepository]
})
export class OrdersModule { }
