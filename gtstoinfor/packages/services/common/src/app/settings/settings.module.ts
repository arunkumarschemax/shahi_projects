import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Settings } from './settings.entity';
import { SettingsController } from './settings.controller';
import { Company } from '../company/company.entity';
import { FactoriesEntity } from '../factories/factories.entity';
import { Division } from '../division/division.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Currencies } from '../currencies/currencies.entity';
import { LiscenceType } from '../liscence-type/liscence-type.entity';
import { PackageTerms } from '../packages-terms/package-terms.entity';
import { PaymentMethod } from '../payment-methods/payment-method-entity';
import { PaymentTerms } from '../payment-terms/payment-terms.entity';
import { DeliveryMethod } from '../delivery-method/delivery-method.entity';
import { DeliveryTerms } from '../delivery-terms/delivery-terms.entity';
import { Address } from '../buyers/address.entity';
import { SettingsRepository } from './settings.repository';
import { SettingsService } from './settings.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Settings,Company,FactoriesEntity,Division,Warehouse,Currencies,LiscenceType,PackageTerms,PaymentMethod,PaymentTerms,DeliveryMethod,DeliveryTerms,Address]),
        ],
        controllers: [SettingsController],
        providers: [SettingsService,ApplicationExceptionHandler,SettingsRepository]
      })
export class SettingsModule{}