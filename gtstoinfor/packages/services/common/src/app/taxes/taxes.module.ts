import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxesAdapter } from './dto/taxes.adapter';
import { TaxesController } from './taxes.controller';
import { TaxesService } from './taxes.service';
import { Taxes } from './dto/taxes.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Taxes]),
  ],
  controllers: [TaxesController],
  providers: [TaxesService,TaxesAdapter,ApplicationExceptionHandler]
})
export class TaxesModule {}
