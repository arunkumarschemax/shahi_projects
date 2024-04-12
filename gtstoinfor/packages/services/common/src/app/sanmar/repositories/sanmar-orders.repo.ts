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
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.buyerPo !== undefined){
                query.andWhere(`o.buyer_po ='${req.buyerPo}'`) 
            }
            if(req.style !== undefined){
                query.andWhere(`o.po_style LIKE :po_style`, { po_style: `%${req.style}%` });
            }
            if (req.color !== undefined) {
                query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            }
            if (req.deliveryDateStartDate !== undefined) {
                query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            }
            // query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }


    async getCustomerPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT buyer_po`)
        
        return await query.getRawMany()
    }

    async getorderacceptanceData(req?:SanmarOrderFilter): Promise<any[]> {
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.buyerPo !== undefined){
                query.andWhere(`o.buyer_po ='${req.buyerPo}'`) 
            }
            if(req.style !== undefined){
                query.andWhere(`o.po_style LIKE :po_style`, { po_style: `%${req.style}%` });
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

    async getordercomparationData(req?:SanmarOrderFilter): Promise<any[]> {
        console.log(req,"tayay")
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.buyerPo !== undefined){
                query.andWhere(`o.buyer_po ='${req.buyerPo}'`) 
            }
            if(req.style !== undefined){
                query.andWhere(`o.po_style LIKE :po_style`, { po_style: `%${req.style}%` });
            }
            if (req.color !== undefined) {
                query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
            }
            if (req.deliveryDateStartDate !== undefined) {
                query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            }
            // query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }



    
}