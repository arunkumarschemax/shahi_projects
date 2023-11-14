import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialTrimEntity } from "../entity/material-trim-entity";
import { MaterialIssueEntity } from "../entity/material-issue-entity";
import { TrimDataDto } from "@project-management-system/shared-models";
import { Colour } from "../../colours/colour.entity";

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



    // async findTrimDataThroughMiId(id: number) {
    //     const query = await this.createQueryBuilder('tr')
    //         .select(`tr.color_id AS trimcolor_id,tr.consumption AS trimconsumption,tr.issued_quantity AS trimissued_quantity,cr.colour AS color`)
    //         .leftJoin(Colour, 'cr', 'cr.colour_id = tr.color_id')
    //         .where(`tr.material_issue_id =  ${id} `)
    //         .getRawMany()
    //     console.log(query, id)
    //     return query.map((rec) => {
    //         return new TrimDataDto(null, rec.trimCode, rec.color, rec.trimconsumption, rec.trimissued_quantity, null)
    //     })
    // }
} 