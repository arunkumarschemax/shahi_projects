import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HMStyleEntity } from "../entittes/hm-style-entity";

@Injectable()
export class HMStyleRepo extends Repository<HMStyleEntity> {
    constructor(@InjectRepository(HMStyleEntity) private itemsRepo: Repository<HMStyleEntity>
    ) {
        super(itemsRepo.target, itemsRepo.manager, itemsRepo.queryRunner);
    }

   
}