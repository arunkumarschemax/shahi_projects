import { Repository } from "typeorm";
import { TrimOrdersEntity } from "../entities/trim-orders.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FileIdReq } from "../models/file-id.req";

export class TrimOrdersRepository extends Repository<TrimOrdersEntity> {
    constructor(@InjectRepository(TrimOrdersEntity) private trimOrderRepository: Repository<TrimOrdersEntity>
    ) {
        super(trimOrderRepository.target, trimOrderRepository.manager, trimOrderRepository.queryRunner);
    }
    async getTrimOders(): Promise<any[]> {
        const query = this.createQueryBuilder('to')
            .select('*')
        return await query.getRawMany();
    }

    async deleteTrimOrderData( req: FileIdReq) : Promise<void>{
        const queryBuilder = this.createQueryBuilder('orders');
        queryBuilder.where(`file_id = '${req.fileId}' AND version = 1`);
        await queryBuilder.delete().execute();
    }
    async getTrimOdersNo(): Promise<any[]> {
        const query = this.createQueryBuilder('to')
            .select('to.order_no')
            .groupBy(`to.order_no`)
        return await query.getRawMany();
    }
}