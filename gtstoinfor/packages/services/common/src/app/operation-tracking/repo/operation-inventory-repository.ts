import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationInventory } from "../entity/operation-inventory-entity";

@Injectable()
export class OperationInventoryRepository extends Repository<OperationInventory> {

    constructor(@InjectRepository(OperationInventory) private operationSequence: Repository<OperationInventory>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }
}