import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersController } from './buyers.controller';
import { Buyers } from './buyers.entity';
import { BuyersService } from './buyers.service';
import { BuyersAdapter } from './dto/buyers.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Buyers]),
  ],
  controllers: [BuyersController],
  providers: [BuyersService,BuyersAdapter,ApplicationExceptionHandler]
})
export class BuyersModule {}
