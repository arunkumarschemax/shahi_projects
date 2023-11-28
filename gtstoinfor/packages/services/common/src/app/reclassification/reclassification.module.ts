import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { ReclassificationEntity } from "./reclassification.entity";
import { ReclassificationService } from "./reclassification.service";
import { ReclassificationAdapter } from "./reclassification.adaptor";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StocksEntity } from "../stocks/stocks.entity";
import { ReclassificationController } from "./reclassification.controller";


@Module({
    imports: [TypeOrmModule.forFeature([ReclassificationEntity,StocksEntity])],
    controllers: [ReclassificationController],
    providers: [ReclassificationService, ApplicationExceptionHandler, ReclassificationAdapter,StocksRepository],
    exports: [TypeOrmModule, ReclassificationService]
})

export class ReclassificationModule { }