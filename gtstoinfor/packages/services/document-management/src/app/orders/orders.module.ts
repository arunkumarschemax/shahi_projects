import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersEntity } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersRepository } from './repository/orders.repository';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FileUploadRepository } from './repository/upload.repository';
import { FileUploadEntity } from './entities/upload-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,FileUploadEntity
    ])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersAdapter, OrdersRepository, ApplicationExceptionHandler,FileUploadRepository]
})
export class OrdersModule { }
