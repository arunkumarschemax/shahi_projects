import { Injectable } from "@nestjs/common";
import { HbOrdersEntity } from "../entity/hb-orders.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PoOrderFilter } from "packages/libs/shared-models/src/common/ralph_lauren";
import { HbPoOrderFilter } from "packages/libs/shared-models/src/common/hb-athletic";



@Injectable()
export class HbOrdersRepository extends Repository<HbOrdersEntity> {

    constructor(@InjectRepository(HbOrdersEntity) private HbOrdersRepository: Repository<HbOrdersEntity>
    ) {
        super(HbOrdersRepository.target, HbOrdersRepository.manager, HbOrdersRepository.queryRunner);
    }




    async getHborderData(req?:HbPoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.custPo !== undefined){
                query.andWhere(`o.cust_po ='${req.custPo}'`) 
            }
          
        return await query.getRawMany()
    }

}