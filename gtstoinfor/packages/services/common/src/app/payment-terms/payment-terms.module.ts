import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTermsAdapter } from './dto/payment-terms.adapter';
import { PaymentTermsController } from './payment-terms.controller';
import { PaymentTerms } from './payment-terms.entity';
import { PaymentTermsService } from './payment-terms.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentTerms]),
  ],
  controllers: [PaymentTermsController],
  providers: [PaymentTermsService,PaymentTermsAdapter,ApplicationExceptionHandler]
})
export class PaymentTermsModule {}
