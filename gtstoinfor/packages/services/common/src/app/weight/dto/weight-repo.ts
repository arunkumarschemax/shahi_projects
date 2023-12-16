import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WeightEntity } from "./weight-entity";
@Injectable()
export class weightRepository extends Repository<WeightEntity> {
    constructor(@InjectRepository(WeightEntity) private weightRepo: Repository<WeightEntity>
    ) {
        super(weightRepo.target, weightRepo.manager, weightRepo.queryRunner);
    }
}