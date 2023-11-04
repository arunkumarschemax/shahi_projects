import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { StocksEntity } from "../stocks.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class StocksRepository extends Repository<StocksEntity> {
    constructor(@InjectRepository(StocksEntity) private userRepository: Repository<StocksEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}