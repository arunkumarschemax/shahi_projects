import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialFabricEntity } from "../entity/material-fabric-entity";

@Injectable()
export class MaterialFabricRepository extends Repository<MaterialFabricEntity> {

    constructor(@InjectRepository(MaterialFabricEntity) private operationSequence: Repository<MaterialFabricEntity>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }
}