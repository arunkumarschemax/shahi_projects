import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { FileIdReq } from "../models/file-id.req";

@Injectable()
export class OrderDifferenceRepository extends Repository<OrdersDifferenceEntity> {
    constructor(@InjectRepository(OrdersDifferenceEntity) private orderDiffRepository: Repository<OrdersDifferenceEntity>
    ) {
        super(orderDiffRepository.target, orderDiffRepository.manager, orderDiffRepository.queryRunner);
    }

    async deleteDiffData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('oc');
        queryBuilder.where(`file_id = '${req.fileId}'`);
        await queryBuilder.delete().execute();
    }
}