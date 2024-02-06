import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EddieOrdersEntity } from "../entities/eddie-orders.entity";
import { EddieOrderFilter } from "packages/libs/shared-models/src/common/eddiebauer/eddie-order-filter";



@Injectable()
export class EddieOrdersRepository extends Repository<EddieOrdersEntity> {

    constructor(@InjectRepository(EddieOrdersEntity) private EddieOrdersRepo: Repository<EddieOrdersEntity>
    ) {
        super(EddieOrdersRepo.target, EddieOrdersRepo.manager, EddieOrdersRepo.queryRunner);
    }



    async getorderacceptanceData(req?:EddieOrderFilter): Promise<any[]> {
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            if (req.color !== undefined) {
                query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            }
            if (req.deliveryDateStartDate !== undefined) {
                query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            }
            query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }

    async getPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT po_number`)
        
        return await query.getRawMany()
    }
    
    async getordersDataInfo(req?:EddieOrderFilter): Promise<any[]> {
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            if (req.color !== undefined) {
                query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            }
            if (req.deliveryDateStartDate !== undefined) {
                query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            }
          
        return await query.getRawMany()
    }

    async getordercomparationData(req?: EddieOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }

        return await query.getRawMany()
    }
    
}