import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodAdapter } from './dto/payment-method.adapter';
import { PaymentMethod } from './payment-method-entity';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';


@Module({
  imports: [
  TypeOrmModule.forFeature([PaymentMethod]),
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService,PaymentMethodAdapter,ApplicationExceptionHandler]
})
export class PaymentMethodModule {


  
}