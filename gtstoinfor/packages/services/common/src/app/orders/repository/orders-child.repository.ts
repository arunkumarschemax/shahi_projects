import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../orders-child.entity";
import { OrdersEntity } from "../orders.entity";
import { AppDataSource } from "../../app-datasource";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";

@Injectable()
export class OrdersChildRepository extends Repository<OrdersChildEntity> {
    constructor(@InjectRepository(OrdersChildEntity)
    private orderChildRepository: Repository<OrdersChildEntity>
        // @InjectConnection() private readonly connection: Connection
    ) {
        super(orderChildRepository.target, orderChildRepository.manager, orderChildRepository.queryRunner);
    }

    async getVersion(productionPlanId: string): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`id,production_plan_id, version`)
            .where(` production_plan_id = ${productionPlanId}`)
            .orderBy(` version`, 'DESC')
        return await query.getRawMany();
    }

    async getData(productionPlanId: string): Promise<any> {
        const manager = AppDataSource
        const query = `SELECT GROUP_CONCAT(sb.requested_wh_date) AS wh_date,GROUP_CONCAT(sb.order_qty_pcs),GROUP_CONCAT(sb.contracted_date), GROUP_CONCAT(DATE(sb.created_at))  from  ( SELECT * FROM orders_child  WHERE production_plan_id = '${productionPlanId}' ORDER BY id DESC LIMIT 2) sb`
        const data = await manager.query(query)
    }


}