import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from 'packages/libs/backend-utils/src/exception-handling/application-exception-handler';
import { PriceService } from './price-service';
import { PriceEntity } from '../entity/price-entity';
import { PriceController } from './price-controller';
import { PriceAdapter } from '../adapter/price-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity])],
  controllers: [PriceController],
  providers: [PriceService,PriceAdapter,ApplicationExceptionHandler],
  exports:[TypeOrmModule,PriceService]
})
export class PriceModule {}
