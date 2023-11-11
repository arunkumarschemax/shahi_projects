import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialTrimEntity } from "../entity/material-trim-entity";
import { MaterialIssueEntity } from "../entity/material-issue-entity";

@Injectable()
export class MaterialTrimRepository extends Repository<MaterialTrimEntity> {

    constructor(@InjectRepository(MaterialTrimEntity) private operationSequence: Repository<MaterialTrimEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }

    async getMaterialTrim() {
        const query = this.createQueryBuilder(`tr`)
            .select(`tr.material_trim_id,tr.description,tr.color_id,tr.consumption,tr.consumption_uom,tr.issued_quantity,tr.issued_quantity_uom`)
        return await query.getRawMany();

    };



    // async findTrimDataThroughMiId(id: string) {
    //     const query = await this.createQueryBuilder('tr')
    //         .select(`tr.description AS trimdescription,tr.color_id AS trimcolor_id,tr.consumption AS trimconsumption,tr.consumption_uom AS trimconsumption_uom,tr.issued_quantity AS trimissued_quantity,tr.issued_quantity_uom AS trimissued_quantity_uom,tr.color_id as colorId`)
    //         .leftJoin(MaterialIssueEntity, 'mi', 'tr.material_issue_id = mi.material_issue_id')
    //         .where(`tr.material_issue_id = "${id}"`)
    //         .getRawMany()
    //         console.log(query ,"trimDta")
    //     return query;
    // }
}