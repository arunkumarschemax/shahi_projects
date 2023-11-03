import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationTracking } from "../entity/operation-tracking-entity";

@Injectable()
export class OperationTrackingRepository extends Repository<OperationTracking> {

    constructor(@InjectRepository(OperationTracking) private operationSequence: Repository<OperationTracking>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }

    async getTrackingId(): Promise<any> {
        const query = this.createQueryBuilder()
            .select(` MAX(operation_tracking_id) as trackingId`)
        return await query.getRawOne();
    }
}