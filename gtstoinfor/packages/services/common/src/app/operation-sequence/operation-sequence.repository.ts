import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationSequence } from "./operation-sequence.entity";

@Injectable()
export class OperationSequenceRepository extends Repository<OperationSequence> {

    constructor(@InjectRepository(OperationSequence) private operationSequence: Repository<OperationSequence>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }
}