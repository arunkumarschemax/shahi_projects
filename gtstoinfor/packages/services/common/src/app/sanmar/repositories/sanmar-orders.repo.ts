import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SanmarOrdersEntity } from "../entity/sanmar-orders.entity";
import { SanmarOrderFilter } from "@project-management-system/shared-models";



@Injectable()
export class SanmarOrdersRepository extends Repository<SanmarOrdersEntity> {

    constructor(@InjectRepository(SanmarOrdersEntity) private SanOrdersRepo: Repository<SanmarOrdersEntity>
    ) {
        super(SanOrdersRepo.target, SanOrdersRepo.manager, SanOrdersRepo.queryRunner);
    }

    async getorderDataForInfo(req?:SanmarOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.buyerPo !== undefined){
                query.andWhere(`o.cust_po ='${req.buyerPo}'`) 
            }
            if(req.style !== undefined){
                query.andWhere(`o.style LIKE :style`, { style: `%${req.style}%` });
            }
            if (req.color !== undefined) {
                query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            }
            if (req.deliveryDateStartDate !== undefined) {
                query.andWhere(`STR_TO_DATE(o.exit_factory_date, '%d-%m-%Y') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            }
            // query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }





    
}