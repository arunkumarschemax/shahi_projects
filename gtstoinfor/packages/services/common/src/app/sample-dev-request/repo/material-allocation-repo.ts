import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MaterialAllocationEntity } from "../entities/material-allocation.entity";
import {Location} from "../../../app/locations/location.entity"
import { buyerReq } from "@project-management-system/shared-models";
import { Buyers } from "../../buyers/buyers.entity";
import { SampleRequest } from "../entities/sample-dev-request.entity";

@Injectable()
export class MaterialAllocationRepo extends Repository<MaterialAllocationEntity> {
    constructor(@InjectRepository(MaterialAllocationEntity) 
    private materialalloctionrepo: Repository<MaterialAllocationEntity>
    ) {
        super(materialalloctionrepo.target, materialalloctionrepo.manager, materialalloctionrepo.queryRunner);
    }
    

    async getallMaterialAllocation(req?:buyerReq): Promise<any[]> {
        const query = this.createQueryBuilder('ma')
            .select(`ma.material_allocation_id,ma.item_type,ma.m3_item_id, ma.quantity,ma.sample_order_id,ma.sample_item_id,ma.stock_id,ma.location_id,ma.buyer_id,ma.status, l.location_name, b.buyer_name,sr.request_no`)
            .leftJoin(Location, 'l', `l.location_id = ma.location_id`)
            .leftJoin(Buyers, 'b', `b.buyer_id = ma.buyer_id`)
            .leftJoin(SampleRequest, 'sr', `sr.sample_request_id = ma.sample_order_id`)


            
        if (req.buyerId !== undefined) {
            query.andWhere(`ma.buyer_id = '${req.buyerId}'`)
        }
     
        return await query.getRawMany()
    }


    
   
}