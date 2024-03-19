import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PvhOrderschildEntity } from "../entities/pvh-orders-child.entity";



@Injectable()
export class PvhOrdersChildRepository extends Repository<PvhOrderschildEntity> {

    constructor(@InjectRepository(PvhOrderschildEntity) private PvhOrdersChildRepo: Repository<PvhOrderschildEntity>
    ) {
        super(PvhOrdersChildRepo.target, PvhOrdersChildRepo.manager, PvhOrdersChildRepo.queryRunner);
    }

    
}
