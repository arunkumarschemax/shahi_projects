import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { FileIdReq } from "../models/file-id.req";
import { ordersPlanNo } from "@project-management-system/shared-models";

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

    async getOrderNumbers():Promise<any[]>{
        const query = this.createQueryBuilder('o')
            .select(`o.order_plan_number`)
            .where(`o.column_name = 'order_plan_qty'`)
            .groupBy(`o.order_plan_number`)
            .orderBy(`o.order_plan_number`)
        return await query.getRawMany()
    }
     async getversions(req:ordersPlanNo):Promise<any[]>{
        const query= `SELECT 
        order_plan_number, 
        old_val,
        column_name,
        created_at, 
        new_val,
        display_name,
        version,
        ROW_NUMBER() OVER (PARTITION BY order_plan_number ORDER BY version) AS new_column
    FROM (
        SELECT 
            order_plan_number, 
            column_name,
            old_val,
            new_val,     
            display_name,
            created_at, 
            version
        FROM order_diff
    ) AS ranked
    WHERE order_plan_number  = '${req.OrderPlanNumber}'
    LIMIT 5;`
    const result = await this.query(query);
    return result;
     }
}