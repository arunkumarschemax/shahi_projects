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
}