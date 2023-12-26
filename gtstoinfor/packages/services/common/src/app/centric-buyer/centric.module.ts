import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CentricEntity } from "./entity/centric.entity";
import { CentricController } from "./centric.controller";
import { CentricService } from "./centric.service";
import { CentricRepository } from "./repositories/centric.repo";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { CentricPdfFileUploadEntity } from "./entity/centric-pdf-file.entity";
import { CentricPdfRepository } from "./repositories/pdf-repo";



@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
          CentricEntity,CentricPdfFileUploadEntity
        ])],
    controllers: [CentricController],
    providers: [CentricService, CentricRepository, ApplicationExceptionHandler,CentricPdfRepository]
})
export class CentricModule { }
