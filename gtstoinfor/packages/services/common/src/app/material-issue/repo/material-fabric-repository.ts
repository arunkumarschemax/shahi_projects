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


    async findfbDataThroughMiId(id: number) {
        const query = await this.createQueryBuilder('fb')
            .select('fb.material_fabric_id AS materialcode,fb.fabric_code AS fabricCode,fb.consumption AS consumption,fb.issued_quantity AS issued_quantity,cr.colour AS color')
            .leftJoin(Colour,'cr','cr.colour_id = fb.color_id')
            .where(`fb.material_issue_id = "${id}"`)
            .getRawMany()
            console.log(query,"PPPPPPPPPPPPPPPPPP")
        return query.map((rec)=>{
            return new FabricDataDto(null,rec.fabricCode,rec.color,rec.consumption,rec.issued_quantity,null)
        });
    }

}