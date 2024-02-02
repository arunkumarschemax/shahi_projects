import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { EddieOrdersEntity } from "./entities/eddie-orders.entity";
import { EddieController } from "./eddie.controller";
import { EddieOrdersRepository } from "./repositories/eddie-orders.repo";
import { EddieService } from "./eddie.service";
import { EddiePdfInfoEntity } from "./entities/eddie-pdf.entity";
import { EddiePdfRepo } from "./repositories/eddie-pdf.repo";
import { EddieCOLineRepository } from "./repositories/eddie-co-line.repository";
import { EddieCOLineEntity } from "./entities/eddie-co-line.entity";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        EddieOrdersEntity,EddiePdfInfoEntity,EddieCOLineEntity
    ])],
  controllers: [EddieController],
  providers: [EddieService,ApplicationExceptionHandler,EddieOrdersRepository,EddiePdfRepo,EddieCOLineRepository]
})
export class EddieModule { }