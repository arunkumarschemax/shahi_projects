import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MaterialAllocationEntity } from "../entities/material-allocation.entity";
import {Location} from "../../../app/locations/location.entity"
import { buyerReq } from "@project-management-system/shared-models";
import { Buyers } from "../../buyers/buyers.entity";
import { SampleRequest } from "../entities/sample-dev-request.entity";
import { MaterialAllocationItemsEntity } from "../entities/material-allocation-items";
import { M3ItemsEntity } from "../../m3-items/m3-items.entity";
import { M3TrimsEntity } from "../../m3-trims/m3-trims.entity";

@Injectable()
export class MaterialAllocationRepo extends Repository<MaterialAllocationEntity> {
    constructor(@InjectRepository(MaterialAllocationEntity) 
    private materialalloctionrepo: Repository<MaterialAllocationEntity>
    ) {
        super(materialalloctionrepo.target, materialalloctionrepo.manager, materialalloctionrepo.queryRunner);
    }
    

    async getallMaterialAllocation(req?:buyerReq): Promise<any[]> {
        const query = this.createQueryBuilder('ma')
            .select(`ma.material_allocation_id,ma.item_type,ma.m3_item_id,ma.sample_order_id,ma.sample_item_id,ma.buyer_id,ma.status, b.buyer_name,sr.request_no,m3item.description,m3item.item_code,m3trim.trim_code,maallitem.quantity,
            SUM(maallitem.allocate_quantity) AS total_allocated_quantity`)
            
            .leftJoin(MaterialAllocationItemsEntity,'maallitem',`maallitem.material_allocation_id = ma.material_allocation_id`)
            .leftJoin(Buyers, 'b', `b.buyer_id = ma.buyer_id`)
            .leftJoin(SampleRequest, 'sr', `sr.sample_request_id = ma.sample_order_id`)
            // .leftJoin(Location, 'l', `l.location_id = maallitem.location_id`)
            .leftJoin(M3ItemsEntity,'m3item',`m3item.m3_items_Id = ma.m3_item_id `)
            .leftJoin(M3TrimsEntity,'m3trim',`m3trim.m3_trim_Id = ma.m3_item_id `)
            .groupBy(`ma.material_allocation_id`)



            
        if (req.buyerId !== undefined) {
            query.andWhere(`ma.buyer_id = '${req.buyerId}'`)
        }
     
        return await query.getRawMany()
    }


    
   
}