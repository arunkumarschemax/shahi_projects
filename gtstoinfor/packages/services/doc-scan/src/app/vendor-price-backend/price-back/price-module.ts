import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price-service';
import { PriceEntity } from '../entity/price-entity';
import { PriceController } from './price-controller';
import { PriceAdapter } from '../adapter/price-adapter';
import { ApplicationExceptionHandler } from '@xpparel/backend-utils';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity])],
  controllers: [PriceController],
  providers: [PriceService,PriceAdapter,ApplicationExceptionHandler],
  exports:[TypeOrmModule,PriceService]
})
export class PriceModule {}
