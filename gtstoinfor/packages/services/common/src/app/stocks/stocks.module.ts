import { Module } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { StocksController } from "./stocks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StocksEntity } from "./stocks.entity";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StocksAdapter } from "./adapters/stocks.adatpters";
import { StocksRepository } from "./repository/stocks.repository";
import { StockLogEntity } from "./stock-log-entity";

@Module({
    providers: [StocksService, ApplicationExceptionHandler, StocksAdapter, StocksRepository],
    controllers: [StocksController],
    imports: [
        TypeOrmModule.forFeature([
            StocksEntity,StockLogEntity
        ])
    ],
})

export class StocksModule { }