import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "../entities/orders.entity";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
    constructor(@InjectRepository(OrdersEntity) private orderRepository: Repository<OrdersEntity>
    ) {
        super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
    }

    async getOrdersData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.item_code, o.itemName, o.order_status, o.fr_fabric_name,o.order_qty_pcs, o.contracted_date, o.requested_wh_date, o.created_at`)
            .orderBy(` o.created_at`, 'DESC')
        return await query.getRawMany();
    }

    async getQtyChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.item_code, o.itemName,o.prod_plan_type_name , o.order_status, o.fr_fabric_name, o.contracted_date,o.last_update_date,o.requested_wh_date, od.created_at, od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(` column_name='order_qty_pcs' ORDER BY o.prod_plan_type_name ASC`)
        return await query.getRawMany();
    }

    async getWharehouseDateChangeData(): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.item_code, o.itemName, o.order_status, o.fr_fabric_name, o.order_qty_pcs, o.contracted_date, od.created_at,o.last_update_date ,od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(` column_name='requested_wh_date' ORDER BY od.created_at DESC`)
        return await query.getRawMany();
    }

    async getContractDateChangeData(): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.item_code, o.itemName, o.order_status, o.fr_fabric_name, o.order_qty_pcs, o.requested_wh_date, od.created_at ,o.last_update_date, od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(` column_name='contracted_date' ORDER BY od.created_at DESC`)
        return await query.getRawMany();
    }

    async getUnitCount(): Promise<any[]> {
        const query = this.createQueryBuilder('orders')
            .select(`business_unit , COUNT(business_unit) AS count`)
            .groupBy(`business_unit`)
        return await query.getRawMany();
    }

    async getDivisionCount(): Promise<any[]> {
        const query = this.createQueryBuilder('orders')
            .select(`department_name , COUNT(department_name) AS count`)
            .groupBy(`department_name`)
        return await query.getRawMany();
    }

    // async getOrdersByFileId(req:FileIdReq):Promise<any[]>{
    //     console.log('req',req)
    //     console.log('----------------',req.fileId)
    //     const query = this.createQueryBuilder('o')
    //     .select(`*`)
    //     return await query.getRawMany();
    // }
}