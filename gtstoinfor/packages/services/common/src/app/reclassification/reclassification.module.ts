import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { ReclassificationEntity } from "./reclassification.entity";
import { ReclassificationService } from "./reclassification.service";
import { ReclassificationAdapter } from "./reclassification.adaptor";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StocksEntity } from "../stocks/stocks.entity";
import { ReclassificationController } from "./reclassification.controller";
import { M3ItemsEntity } from "../m3-items/m3-items.entity";
import { M3TrimsEntity } from "../m3-trims/m3-trims.entity";
import { M3ItemsRepo } from "../m3-items/m3-items.repository";
import { M3TrimsRepo } from "../m3-trims/m3-trims.repository";
import { M3ItemsService, M3TrimsService } from "@project-management-system/shared-services";


@Module({
    imports: [TypeOrmModule.forFeature([ReclassificationEntity,StocksEntity,M3TrimsEntity,M3ItemsEntity])],
    controllers: [ReclassificationController],
    providers: [ReclassificationService, ApplicationExceptionHandler, ReclassificationAdapter,StocksRepository,M3ItemsRepo,M3TrimsRepo,M3TrimsService,M3ItemsService],
    exports: [TypeOrmModule, ReclassificationService]
})

export class ReclassificationModule { }