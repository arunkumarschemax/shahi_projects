import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "../orders.entity";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
    constructor(@InjectRepository(OrdersEntity) private orderRepository: Repository<OrdersEntity>
    ) {
        super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
    }

    async getQtyChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.production_plan_id, oc.item_code, oc.contracted_date,oc.requested_wh_date, od.created_at, od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = oc.production_plan_id')
            .where(` column_name='order_qty_pcs' ORDER BY od.created_at DESC`)
        return await query.getRawMany();
    }

    async getWharehouseDateChangeData(): Promise<any> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.production_plan_id, oc.item_code, oc.order_qty_pcs, oc.requested_wh_date, od.created_at, od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = oc.production_plan_id')
            .where(` column_name='contracted_date' ORDER BY od.created_at DESC`)
        return await query.getRawMany();
    }

    async getContractDateChangeData(): Promise<any> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.production_plan_id, oc.item_code, oc.order_qty_pcs, oc.contracted_date, od.created_at, od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = oc.production_plan_id')
            .where(` column_name='requested_wh_date' ORDER BY od.created_at DESC`)
        return await query.getRawMany();
    }
}