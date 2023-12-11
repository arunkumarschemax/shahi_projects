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
            if(req.externalRefNo != undefined){
                query.andWhere(` o.buyer = "${req.externalRefNo}"`)
            }
        return await query.getRawMany()
    }

    async getorderDataByPoNumber(req?:PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.size,o.upc_ean,o.currency,o.price,o.amount,o.c_s_price,o.c_s_currency,o.msrp_price,o.msrp_currency,o.quantity`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            if(req.externalRefNo != undefined){
                query.andWhere(` o.buyer = "${req.externalRefNo}"`)
            }
    
        return await query.getRawMany()
    }


}