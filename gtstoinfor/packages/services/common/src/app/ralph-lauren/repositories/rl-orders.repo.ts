import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RLOrdersEntity } from "../entities/rl-orders.entity";
import { PoOrderFilter } from "@project-management-system/shared-models";

@Injectable()
export class RLOrdersRepository extends Repository<RLOrdersEntity> {

    constructor(@InjectRepository(RLOrdersEntity) private rlOrdersRepository: Repository<RLOrdersEntity>
    ) {
        super(rlOrdersRepository.target, rlOrdersRepository.manager, rlOrdersRepository.queryRunner);
    }

    async getorderData(req?:PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
        return await query.getRawMany()
    }

}