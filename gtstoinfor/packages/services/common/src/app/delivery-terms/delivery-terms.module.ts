import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryTermsController } from './delivery-terms.controller';
import { DeliveryTerms } from './delivery-terms.entity';
import { DeliveryTermsService } from './delivery-terms.service';
import { DeliveryTermsAdapter } from './dto/delivery-terms.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryTerms]),
  ],
  controllers: [DeliveryTermsController],
  providers: [DeliveryTermsService,DeliveryTermsAdapter,ApplicationExceptionHandler]
})
export class DeliveryTermsModule {}
