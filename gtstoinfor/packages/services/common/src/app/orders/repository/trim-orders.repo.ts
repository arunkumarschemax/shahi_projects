import { Repository } from "typeorm";
import { TrimOrdersEntity } from "../entities/trim-orders.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FileIdReq } from "../models/file-id.req";
import { TrimOrdersReq } from "@project-management-system/shared-models";

export class TrimOrdersRepository extends Repository<TrimOrdersEntity> {
    constructor(@InjectRepository(TrimOrdersEntity) private trimOrderRepository: Repository<TrimOrdersEntity>
    ) {
        super(trimOrderRepository.target, trimOrderRepository.manager, trimOrderRepository.queryRunner);
    }
    async getTrimOders(req:TrimOrdersReq): Promise<any[]> {
        const query = this.createQueryBuilder('to')
            .select('*')
            if(req.OrderNumber){
                query.andWhere(`to.order_no = '${req.OrderNumber}'`)
            }
            if (req.approvalFromDate !== undefined) {
                query.andWhere(`Date(to.approval_date) BETWEEN '${req.approvalFromDate}' AND '${req.approvalToDate}'`)
            }
            query.orderBy(`to.order_no`, 'ASC')
        return await query.getRawMany();
    }
    async getUnacceptedTrimOrders(req:TrimOrdersReq): Promise<any[]> {
        const query = this.createQueryBuilder('to')
            .select('*,group_concat(size) as sizes,group_concat(color) as colors,group_concat(order_qty_pcs) as qty')
            if(req.OrderNumber){
                query.andWhere(`to.order_no = '${req.OrderNumber}'`)
            }
            if (req.approvalFromDate !== undefined) {
                query.andWhere(`Date(to.approval_date) BETWEEN '${req.approvalFromDate}' AND '${req.approvalToDate}'`)
            }
            query.groupBy(`to.order_no`)
            query.orderBy(`to.order_no`, 'ASC')
            console.log(await query.getRawMany())
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