import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../orders-child.entity";
import { OrdersEntity } from "../orders.entity";
import { AppDataSource } from "../../app-datasource";

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

    // async getQtyChangeData(): Promise<any[]> {
    //     const manager = getManager('')
    //     const query = `SELECT oc1.production_plan_id, GROUP_CONCAT(oc1.order_qty_pcs ORDER BY oc1.version) AS order_qty_pieces FROM orders_child oc1 INNER JOIN  orders_child oc2 ON oc1.production_plan_id=oc2.production_plan_id WHERE oc1.order_qty_pcs <> oc2.order_qty_pcs AND oc1.order_qty_pcs IS NOT NULLGROUP BY oc1.production_plan_id`
    //     const data = await manager.query(query);
    //     return data;
    // }

    async getQtyChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.production_plan_id, oc.item_name, oc.contract_date,oc.requested_wh_date, od.created_at, od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersEntity, 'od', 'od.production_plan_id = oc.prod_plan_id')
            .where(` column_name='order_qty_pcs' ORDER BY od.created_at DESC LIMIT 1`)
        return await query.getRawMany();
    }

    async getWharehouseDateChangeData(productionPlanId: string): Promise<any> {
        const manager = AppDataSource
        const query = `SELECT t1.id AS id, t1.production_plan_id AS production_plan_id, t1.requested_wh_date AS original_column1, t2.requested_wh_date AS new_column1, t1.order_qty_pcs AS original_column2 FROM orders_child t1 JOIN orders_child t2 ON t1.production_plan_id = t2.production_plan_id WHERE t1.requested_wh_date <> t2.requested_wh_date AND t1.production_plan_id = '${productionPlanId}'  ORDER BY t1.created_at DESC LIMIT 1`
        const data = await manager.query(query);
        return data;
    }

    async getContractDateChangeData(productionPlanId: string): Promise<any> {
        const manager = AppDataSource
        const query = `SELECT t1.id AS id, t1.production_plan_id AS production_plan_id, t1.contracted_date AS original_column1, t2.contracted_date AS new_column1, t1.requested_wh_date AS original_column2 FROM orders_child t1 JOIN orders_child t2 ON t1.production_plan_id = t2.production_plan_id WHERE t1.contracted_date <> t2.contracted_date AND t1.production_plan_id = '${productionPlanId}'  ORDER BY t1.created_at DESC LIMIT 1`
        const data = await manager.query(query);
        return data;
    }
}