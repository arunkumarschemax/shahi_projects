import { Injectable } from "@nestjs/common";
import { HbOrdersEntity } from "../entity/hb-orders.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class HbOrdersRepository extends Repository<HbOrdersEntity> {

    constructor(@InjectRepository(HbOrdersEntity) private HbOrdersRepository: Repository<HbOrdersEntity>
    ) {
        super(HbOrdersRepository.target, HbOrdersRepository.manager, HbOrdersRepository.queryRunner);
    }




}