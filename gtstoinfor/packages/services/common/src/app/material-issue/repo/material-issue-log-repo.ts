import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialIssueLogEntity } from "../entity/material-issue-log-entity";


@Injectable()
export class MaterialIssueLogRepository extends Repository<MaterialIssueLogEntity> {

    constructor(@InjectRepository(MaterialIssueLogEntity) private matIssLog: Repository<MaterialIssueLogEntity>
    ) {
        super(matIssLog.target, matIssLog.manager, matIssLog.queryRunner);
    }

    

}