import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LevisOrderschildEntity } from "../entities/levis-orders-child-entity";



@Injectable()
export class LevisOrdersChildRepository extends Repository<LevisOrderschildEntity> {

    constructor(@InjectRepository(LevisOrderschildEntity) private LevisOrdersChildRepo: Repository<LevisOrderschildEntity>
    ) {
        super(LevisOrdersChildRepo.target, LevisOrdersChildRepo.manager, LevisOrdersChildRepo.queryRunner);
    }

    
}
