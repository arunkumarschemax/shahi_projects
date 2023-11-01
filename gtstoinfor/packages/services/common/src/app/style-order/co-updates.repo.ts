import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoUpdateEntity } from "./co-updates.entity";

@Injectable()
export class CoUpdateRepository extends Repository<CoUpdateEntity> {

    constructor(@InjectRepository(CoUpdateEntity) private CoUpdateRepo: Repository<CoUpdateEntity>
    ) {
        super(CoUpdateRepo.target, CoUpdateRepo.manager, CoUpdateRepo.queryRunner);
    }

}