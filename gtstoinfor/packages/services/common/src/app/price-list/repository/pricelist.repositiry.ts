import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PriceListEntity } from "../entities/pricelist.entity";

@Injectable()
export class pricListRepository extends Repository<PriceListEntity> {
    constructor(@InjectRepository(PriceListEntity) private userRepository: Repository<PriceListEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}