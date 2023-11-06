import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialFabricEntity } from "../entity/material-fabric-entity";
import { MaterialIssueEntity } from "../entity/material-issue-entity";

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
        .select(`mi.material_issue_id as id,mi.consumption_code as consumptioncode,mi.request_no as requestNo,mi. issue_date as date,mi.location_id as locationId ,mi.pch_id as pchId ,mi.buyer_id as buyer ,mi.sample_type_id as sampletype,mi. style_no as style,mi.brand_id ,mi.dmm_id,
        mi.technician_id,mi. description,mi.cost_ref,mi.m3_style_no as styleno,mi.contact,mi.extn,mi.extn,mi.product,mi.type,mi.conversion,mi.made_in `)
        return await query.getRawMany();
    }
}