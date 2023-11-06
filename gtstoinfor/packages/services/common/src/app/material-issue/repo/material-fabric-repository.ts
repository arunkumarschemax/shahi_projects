import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialFabricEntity } from "../entity/material-fabric-entity";

@Injectable()
export class MaterialFabricRepository extends Repository<MaterialFabricEntity> {

    constructor(@InjectRepository(MaterialFabricEntity) private operationSequence: Repository<MaterialFabricEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }
    async getAllActiveFabrics (){
        const query = this.createQueryBuilder(`fb`)
        .select(`fb.material_fabric_id,fb.fabric_code ,fb.description ,fb.color_id ,fb.consumption,fb.consumption_uom,fb.issued_quantity,fb.issued_quantity_uom`)
        return await query.getRawMany(); 
       }
}