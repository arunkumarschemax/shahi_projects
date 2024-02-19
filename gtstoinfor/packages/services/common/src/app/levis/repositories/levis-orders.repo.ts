import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LevisOrdersEntity } from "../entities/levis-orders.entity";
import { LevisOrderFilter } from "@project-management-system/shared-models";



@Injectable()
export class LevisOrdersRepository extends Repository<LevisOrdersEntity> {

    constructor(@InjectRepository(LevisOrdersEntity) private LevisOrdersRepo: Repository<LevisOrdersEntity>
    ) {
        super(LevisOrdersRepo.target, LevisOrdersRepo.manager, LevisOrdersRepo.queryRunner);
    }


    async getorderacceptanceData(req?:LevisOrderFilter): Promise<any[]> {
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            // if (req.color !== undefined) {
            //     query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            // }
            // if (req.deliveryDateStartDate !== undefined) {
            //     query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            // }
            query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }

    async getPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT po_number`)
        
        return await query.getRawMany()
    }
    

    async getorderDataForInfo(req?:LevisOrderFilter): Promise<any[]> {
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            // if (req.color !== undefined) {
            //     query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            // }
            // if (req.deliveryDateStartDate !== undefined) {
            //     query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            // }
            query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }

    async getordercomparationData(req?: LevisOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }

        return await query.getRawMany()
    }

    
}