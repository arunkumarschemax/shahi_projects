import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { StocksEntity } from "../stocks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
import { StockLogEntity } from "../stock-log-entity";

@Injectable()
export class StockLogRepository extends Repository<StockLogEntity> {
    constructor(@InjectRepository(StockLogEntity) private userRepository: Repository<StockLogEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

}