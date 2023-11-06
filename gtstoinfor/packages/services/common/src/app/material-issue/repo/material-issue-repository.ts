import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialFabricEntity } from "../entity/material-fabric-entity";
import { MaterialIssueEntity } from "../entity/material-issue-entity";
import { Style } from "../../style/dto/style-entity";
import { MaterialIssueRequest } from "@project-management-system/shared-models";

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