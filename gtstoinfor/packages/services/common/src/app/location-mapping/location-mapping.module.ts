import { Module } from "@nestjs/common";
import { LocationMappingController } from "./location-mapping.controller";
import { LocationMappingService } from "./location-mapping.service";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StockLogRepository } from "../stocks/repository/stock-log.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StocksEntity } from "../stocks/stocks.entity";
import { StockLogEntity } from "../stocks/stock-log-entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
          StocksEntity,
          StockLogEntity,
        ]),
        ],
    controllers: [LocationMappingController],
    providers: [LocationMappingService,StocksRepository,StockLogRepository],
    // exports: []
})
export class LocationMappingModule { }