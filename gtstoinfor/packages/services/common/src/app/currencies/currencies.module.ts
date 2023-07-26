import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import {Currencies } from './currencies.entity';
import {CurrenciesAdapter} from './dto/currencies.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Currencies]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService,CurrenciesAdapter,ApplicationExceptionHandler],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
