import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricEntity } from "../entity/centric.entity";


@Injectable()
export class CentricRepository extends Repository<CentricEntity> {

    constructor(@InjectRepository(CentricEntity) private CentricRepo: Repository<CentricEntity>
    ) {
        super(CentricRepo.target, CentricRepo.manager, CentricRepo.queryRunner);
    }

    


}