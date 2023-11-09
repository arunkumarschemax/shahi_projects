import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialFabricEntity } from "../entity/material-fabric-entity";
import { MaterialIssueEntity } from "../entity/material-issue-entity";
import { Style } from "../../style/dto/style-entity";
import { MaterialIssueRequest } from "@project-management-system/shared-models";
import { MaterialTrimEntity } from "../entity/material-trim-entity";
import { Colour } from "../../colours/colour.entity";

@Injectable()
export class MaterialIssueRepository extends Repository<MaterialIssueEntity> {

    constructor(@InjectRepository(MaterialIssueEntity) private operationSequence: Repository<MaterialIssueEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }

    async getMaterialIssueById(): Promise<any> {
        const query = this.createQueryBuilder()
            .select(` MAX(material_issue_id) as materialIssueId`)
        return await query.getRawOne();
    }
    async getMaterialIssue (){
        const query = this.createQueryBuilder(`mi`)
        .select(`mi.material_issue_id as id,mi.consumption_code as consumptioncode,mi.request_no as requestNo,mi.issue_date as date,mi.location_id as locationId ,mi.pch_id as pchId ,mi.buyer_id as buyer ,mi.sample_type_id as sampletype,mi. style_no as style_no,mi.brand_id ,mi.dmm_id,mi.technician_id,mi.description,mi.cost_ref,mi.m3_style_no as m3_style_no,mi.contact,mi.extn,mi.extn,mi.product,mi.type,mi.conversion,mi.made_in ,fb.material_fabric_id as materialcode,fb.fabric_code as fabricCode,fb.description as fbdescription,fb.consumption as consumption,fb.consumption_uom,fb.issued_quantity as issued_quantity,fb.issued_quantity_uom,tr.material_trim_id,tr.description,tr.color_id,tr.consumption as consumption,tr.consumption_uom,tr.issued_quantity as issuedQuantity,tr.issued_quantity_uom,c.colour as color`)
        .leftJoin(MaterialFabricEntity,'fb','fb.material_issue_id = mi.material_issue_id')
        .leftJoin(MaterialTrimEntity,'tr','tr.material_issue_id = mi.material_issue_id')
        .leftJoin(Colour,'c','c.colour_id = fb.color_id')
        .groupBy(' fb.fabric_code')
        const data = await query.getRawMany()
        return data 
    }

    // async getDataByStyleId(req:MaterialIssueRequest): Promise<any> {
    //     console.log(req,'=====-----------------=======')
    //     const query = this.createQueryBuilder('mi')
    //         .select(`mi.consumption_code as consumptionCode,mi.request_no as requestNo,mf.issued_quantity AS fabricQty,mi.style_id as styleId,mi.style_no as styleNo`)
    //         .leftJoin(MaterialFabricEntity,'mf','mf.material_issue_id = mi.material_issue_id')
    //         .leftJoin(Style,'s','s.style = mi.style_no')
    //         .where(`mi.style_id = '${req.styleId}'`)
    //         .groupBy(`mi.consumption_code`)
    //     return await query.getRawMany();
    // }
}