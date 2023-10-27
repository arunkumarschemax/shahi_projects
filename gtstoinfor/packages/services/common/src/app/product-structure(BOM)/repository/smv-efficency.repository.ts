import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SMVEfficiencyEntity } from "../smv-efficency.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SMVEfficiencyRepository extends Repository<SMVEfficiencyEntity> {

    constructor(@InjectRepository(SMVEfficiencyEntity) private SmvEffRepo: Repository<SMVEfficiencyEntity>
    ) {
        super(SmvEffRepo.target, SmvEffRepo.manager, SmvEffRepo.queryRunner);
    }

   
}