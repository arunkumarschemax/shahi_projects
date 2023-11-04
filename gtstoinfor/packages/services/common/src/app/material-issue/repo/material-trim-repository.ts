import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialTrimEntity } from "../entity/material-trim-entity";

@Injectable()
export class MaterialTrimRepository extends Repository<MaterialTrimEntity> {

    constructor(@InjectRepository(MaterialTrimEntity) private operationSequence: Repository<MaterialTrimEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }
}