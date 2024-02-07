import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LevisOrdersEntity } from "../entities/levis-orders.entity";



@Injectable()
export class LevisOrdersRepository extends Repository<LevisOrdersEntity> {

    constructor(@InjectRepository(LevisOrdersEntity) private LevisOrdersRepo: Repository<LevisOrdersEntity>
    ) {
        super(LevisOrdersRepo.target, LevisOrdersRepo.manager, LevisOrdersRepo.queryRunner);
    }


    
}