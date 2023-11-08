import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialTrimEntity } from "../entity/material-trim-entity";

@Injectable()
export class MaterialTrimRepository extends Repository<MaterialTrimEntity> {

    constructor(@InjectRepository(MaterialTrimEntity) private operationSequence: Repository<MaterialTrimEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }
    
    async getMaterialTrim (){
        const query = this.createQueryBuilder(`tr`)
        .select(`tr.material_trim_id,tr.description,tr.color_id,tr.consumption,tr.consumption_uom,tr.issued_quantity,tr.issued_quantity_uom`)
        return await query.getRawMany(); 

    }
}