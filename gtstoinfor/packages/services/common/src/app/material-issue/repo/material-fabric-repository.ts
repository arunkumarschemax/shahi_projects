import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialFabricEntity } from "../entity/material-fabric-entity";
import { FabricDataDto, MaterialIssueRequest } from "@project-management-system/shared-models";
import { MaterialIssueEntity } from "../entity/material-issue-entity";
import { Colour } from "../../colours/colour.entity";

@Injectable()
export class MaterialFabricRepository extends Repository<MaterialFabricEntity> {

    constructor(@InjectRepository(MaterialFabricEntity) private operationSequence: Repository<MaterialFabricEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }

    async getDataByStyleId(req: MaterialIssueRequest): Promise<any> {
        console.log(req, '=====-----------------=======')
        const query = this.createQueryBuilder('mf')
            .select(` mf.fabric_code AS fabricCode,mf.issued_quantity AS issuedQuantity,mf.issued_quantity_uom AS issuedUom,mf.issued_uom_id as issuedUomId, mi.consumption_code AS consumptionCode,mi.request_no AS requestNo, mf.reported_status as reportedStatus,mf.material_fabric_id as materialFabricId,  mf.material_issue_id as materialIssueId`)
            .leftJoin(MaterialIssueEntity, 'mi', 'mi.material_issue_id = mf.material_issue_id')
            .where(`mi.style_id = '${req.styleId}'`)
        return await query.getRawMany();
    }
    async getAllActiveFabrics() {
        const query = this.createQueryBuilder(`fb`)
            .select(`fb.material_fabric_id,fb.fabric_code ,fb.description ,fb.color_id ,fb.consumption,fb.consumption_uom,fb.issued_quantity,fb.issued_quantity_uom`)
        return await query.getRawMany();
    };


   
}