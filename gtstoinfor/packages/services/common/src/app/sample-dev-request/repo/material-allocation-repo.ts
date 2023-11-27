import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MaterialAllocationEntity } from "../entities/material-allocation.entity";
import {Location} from "../../../app/locations/location.entity"
import { buyerReq } from "@project-management-system/shared-models";
import { Buyers } from "../../buyers/buyers.entity";
import { SampleRequest } from "../entities/sample-dev-request.entity";
import { MaterialAllocationItemsEntity } from "../entities/material-allocation-items";

@Injectable()
export class MaterialAllocationRepo extends Repository<MaterialAllocationEntity> {
    constructor(@InjectRepository(MaterialAllocationEntity) 
    private materialalloctionrepo: Repository<MaterialAllocationEntity>
    ) {
        super(materialalloctionrepo.target, materialalloctionrepo.manager, materialalloctionrepo.queryRunner);
    }
    

    async getallMaterialAllocation(req?:buyerReq): Promise<any[]> {
        const query = this.createQueryBuilder('ma')
            .select(`ma.material_allocation_id,ma.item_type,ma.m3_item_id,ma.sample_order_id,ma.sample_item_id,ma.buyer_id,ma.status, l.location_name, b.buyer_name,sr.request_no,maallitem.material_allocation_items_id,maallitem.allocate_quantity,maallitem.quantity,maallitem.stock_id,maallitem.location_id`)
            
            .leftJoin(MaterialAllocationItemsEntity,'maallitem',`maallitem.material_allocation_id = ma.material_allocation_id`)
            .leftJoin(Buyers, 'b', `b.buyer_id = ma.buyer_id`)
            .leftJoin(SampleRequest, 'sr', `sr.sample_request_id = ma.sample_order_id`)
            .leftJoin(Location, 'l', `l.location_id = maallitem.location_id`)


            
        if (req.buyerId !== undefined) {
            query.andWhere(`ma.buyer_id = '${req.buyerId}'`)
        }
     
        return await query.getRawMany()
    }


    
   
}