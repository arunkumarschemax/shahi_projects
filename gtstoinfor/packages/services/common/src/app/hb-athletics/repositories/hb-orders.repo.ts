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
            if(req.style !== undefined){
                query.andWhere(`o.style ='${req.style}'`) 
            }
            if(req.color !== undefined){
                query.andWhere(`o.color ='${req.color}'`) 
            }
            if (req.deliveryDateStartDate !== undefined) {
                query.andWhere(`(o.exit_factory_date) BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
            }
            query.andWhere(`o.status != 'ACCEPTED'`);
          
        return await query.getRawMany()
    }

    async getDistinctHBPoNumbers(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT cust_po`)
        
        return await query.getRawMany()
    }

    async getHborderDataForInfo(req?:HbPoOrderFilter): Promise<any[]> {
        console.log(req,"uuuuuu")
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.custPo !== undefined){
                query.andWhere(`o.cust_po ='${req.custPo}'`) 
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
          
        return await query.getRawMany()
    }

    async getordercomparationData(req?:HbPoOrderFilter): Promise<any[]> {
        console.log(req,"uuuuuu")
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.custPo !== undefined){
                query.andWhere(`o.cust_po ='${req.custPo}'`) 
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
          
        return await query.getRawMany()
    }
}