import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryMethod } from './delivery-method.entity';
import { DeliveryMethodController } from './delivery-method.controller';
import { DeliveryMethodService } from './delivery-method.service';
import { DeliveryMethodAdapter } from './dto/delivery-method.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([DeliveryMethod]),
  ],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService,DeliveryMethodAdapter,ApplicationExceptionHandler]
})
export class DeliveryMethodModule {


  
}