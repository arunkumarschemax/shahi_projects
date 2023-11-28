import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialAllocationItemsEntity } from "../entities/material-allocation-items";
import { RackPositionEntity } from "../../rm_locations/rack-position.entity";
import { MaterialAllocationitemsIdreq } from "@project-management-system/shared-models";
import { MaterialallitemsReq } from "../dto/sample-req-size-req";



@Injectable()
export class MaterialAllocationItemsRepo extends Repository<MaterialAllocationItemsEntity> {
    constructor(@InjectRepository(MaterialAllocationItemsEntity) 
    private materialalloctionitemrepo: Repository<MaterialAllocationItemsEntity>
    ) {
        super(materialalloctionitemrepo.target, materialalloctionitemrepo.manager, materialalloctionitemrepo.queryRunner);
    }
    
    // MaterialAllocationitemsIdreq
    async getallMaterialAllocationItemsById(req:MaterialallitemsReq): Promise<any[]> {
        const query = this.createQueryBuilder('it')
            .select(`it.material_allocation_items_id,it.quantity,it.allocate_quantity,it.stock_id,it.location_id,it.material_allocation_id,po.rack_position_name`)
            .leftJoin(RackPositionEntity,'po',`po.position_id = it.location_id`)
            .where(`it.material_allocation_id=${req.materialAllocationId}`)
            
            
        return await query.getRawMany()
    }


}
   
