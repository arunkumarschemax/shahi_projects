import { Injectable } from "@nestjs/common";
import { HbOrdersEntity } from "../entity/hb-orders.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HbOrdersChildEntity } from "../entity/hb-orders-child.entity";



@Injectable()
export class HbOrdersChildRepository extends Repository<HbOrdersChildEntity> {

    constructor(@InjectRepository(HbOrdersChildEntity) private HbOrdersChildRepository: Repository<HbOrdersChildEntity>
    ) {
        super(HbOrdersChildRepository.target, HbOrdersChildRepository.manager, HbOrdersChildRepository.queryRunner);
    }

    
}