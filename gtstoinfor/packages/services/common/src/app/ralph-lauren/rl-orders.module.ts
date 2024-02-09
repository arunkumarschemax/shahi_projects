import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { RLOrdersService } from './rl-orders.service';
import { RLOrdersController } from './rl-orders.controller';
import { PdfFileUploadRepository } from './repositories/pdf-file.repo';
import { RLOrdersRepository } from './repositories/rl-orders.repo';
import { PdfFileUploadEntity } from './entities/pdf-file-upload.entity';
import { RLOrdersEntity } from './entities/rl-orders.entity';
import { COLineEntity } from './entities/co-line.entity';
import { COLineRepository } from './repositories/co-line.repository';
import { AddressService } from '../Entites@Shahi/address/address-service';
import { AddressRepository } from '../Entites@Shahi/address/address.repo';
import { AddressEntity } from '../Entites@Shahi/address/address-entity';
import { RLOrderschildEntity } from './entities/rl-orders-child.entity';
import { RLOrdersChildRepository } from './repositories/rl-orders-child.repo';
import { tradeEntity } from './entities/trade-link.entity';
import { ColorEntity } from '../Entites@Shahi/color/color-entity';
import { ColorRepository } from '../Entites@Shahi/color/color.repo';
import { ColorService } from '../Entites@Shahi/color/color-service';


@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
            PdfFileUploadEntity,
            RLOrdersEntity,
            COLineEntity,
            AddressEntity,
            RLOrderschildEntity,
            tradeEntity,
            ColorEntity
        ])],
    controllers: [RLOrdersController],
    providers: [RLOrdersService, PdfFileUploadRepository, RLOrdersRepository, COLineRepository, ApplicationExceptionHandler, AddressRepository, AddressService,RLOrdersChildRepository,ColorRepository,ColorService]
})
export class RLOrdersModule { }
