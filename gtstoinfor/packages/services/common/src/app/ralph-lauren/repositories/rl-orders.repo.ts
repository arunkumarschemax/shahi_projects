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
            if(req.season != undefined){
                query.andWhere(` o.season_code = "${req.season}"`)
            }
            if(req.material != undefined){
                query.andWhere(` o.material_no = "${req.material}"`)
            }
        return await query.getRawMany()
    }

    async getorderDataforAcceptance(req?:PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            if(req.externalRefNo != undefined){
                query.andWhere(` o.buyer = "${req.externalRefNo}"`)
            }
            if(req.season != undefined){
                query.andWhere(` o.season_code = "${req.season}"`)
            }
            if(req.material != undefined){
                query.andWhere(` o.material_no = "${req.material}"`)
            }
            query.andWhere(`o.item_status != "ACCEPTED"`);
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

    async getordercomparationData(req?:PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
          
        return await query.getRawMany()
    }
    async getpoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`distinct po_number`); // Corrected the typo here
    
        return await query.getRawMany();
    }



}