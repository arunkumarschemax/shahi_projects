import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersController } from './buyers.controller';
import { Buyers } from './buyers.entity';
import { BuyersService } from './buyers.service';
import { BuyersAdapter } from './dto/buyers.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyerGeneralAttributesEntity } from './buyers-general.entity';
import { BuyersGeneralAttributeService } from './buyers-general-attributes.service';
import { Address } from './address.entity';
import { BuyerRepository } from './buyers.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Buyers,BuyerGeneralAttributesEntity,Address]),
  ],
  controllers: [BuyersController],
  providers: [BuyersService,BuyersAdapter,ApplicationExceptionHandler,BuyersGeneralAttributeService,BuyerRepository]
})
export class BuyersModule {}
