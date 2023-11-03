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
}