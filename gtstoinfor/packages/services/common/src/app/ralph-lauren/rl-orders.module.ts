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



@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
            PdfFileUploadEntity,
            RLOrdersEntity


        ])],
    controllers: [RLOrdersController],
    providers: [RLOrdersService,PdfFileUploadRepository,RLOrdersRepository,ApplicationExceptionHandler]
})
export class RLOrdersModule { }
