import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyingHouse } from './buying-house.entity';
import { BuyingHouseController } from './buying-house.controller';
import { BuyingHouseService } from './buying-house.service';
import { BuyingHouseAdapter } from './dto/buying-house.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([BuyingHouse]),
  ],
  controllers: [BuyingHouseController],
  providers: [BuyingHouseService,BuyingHouseAdapter,ApplicationExceptionHandler]
})
export class BuyingHouseModule {}