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



@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
            PdfFileUploadEntity,
            RLOrdersEntity,
            COLineEntity

        ])],
    controllers: [RLOrdersController],
    providers: [RLOrdersService, PdfFileUploadRepository, RLOrdersRepository, COLineRepository, ApplicationExceptionHandler]
})
export class RLOrdersModule { }
