import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SanmarOrdersEntity } from "./entity/sanmar-orders.entity";
import { SanmarController } from "./sanmar.controller";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";
import { SanmarPdfRepo } from "./repositories/sanmar-pdf.repo";
import { SanmarService } from "./sanmar.service";
import { SanmarPdfInfoEntity } from "./entity/sanmar-pdf.entity";
import { SanmarCOLineEntity } from "./entity/sanmar-co-line.entity";
import { SanmarCOLineRepository } from "./repositories/sanmar-co-line.repository";
import { SanmarOrdersChildRepository } from "./repositories/sanmar-orders-child.repo";
import { SanmarOrderschildEntity } from "./entity/sanmar-orders-child";



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        SanmarOrdersEntity,SanmarPdfInfoEntity,SanmarCOLineEntity,SanmarOrderschildEntity
    ])],
  controllers: [SanmarController],
  providers: [SanmarService,ApplicationExceptionHandler,SanmarOrdersRepository,SanmarPdfRepo,SanmarCOLineRepository,SanmarOrdersChildRepository]
})
export class SanmarModule { }
