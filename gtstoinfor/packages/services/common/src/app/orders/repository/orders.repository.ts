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
            .select(`o.production_plan_id, o.planning_ssn_cd, o.department, o.planning_sum_code, o.planning_sum, o.item,o.vendor, o.sewing_factory, o.branchFactory, o.coeff, o.publish_date,o.order_plan_number,o.gwh,o.wh,o.raw_material_supplier,o.yarn_order_status,o.fbrc_order_status,o.color_order_status,o.trim_order_status,o.po_order_status,o.planned_exf,o.biz,o.fr_fabric,o.trnsp_mthd`)
            .orderBy(` o.planning_ssn_cd`, 'ASC')
        return await query.getRawMany();
    }

    async getQtyChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
        .select(`o.production_plan_id,o.item_cd,o.item,o.prod_plan_type,o.fr_fabric,o.created_at,od.old_val,od.new_val,(od.new_val - od.old_val) AS Diff,od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(` column_name='order_plan_qty' ORDER BY o.prod_plan_type ASC`)
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
            .select(`department , COUNT(department) AS count`)
            .groupBy(`department`)
        return await query.getRawMany();
    }

    async deleteData( req: FileIdReq) : Promise<void>{
        const queryBuilder = this.createQueryBuilder('orders');
        queryBuilder.where(`file_id = '${req.fileId}' AND version = 1`);
        await queryBuilder.delete().execute();
    }

    async getSeasonCount(): Promise<any[]> {
        const query = this.createQueryBuilder('orders')
            .select(`planning_ssn , COUNT(planning_ssn) AS count`)
            .groupBy(`planning_ssn`)
        return await query.getRawMany();
    }
    async getYearWiseData(): Promise<any[]> {
        const query = this.createQueryBuilder('orders')
            .select(`year , COUNT(year) AS count`)
            .groupBy(`year`)
        return await query.getRawMany();
    }

    async seasonWiseReport(): Promise<any[]>{
        const query = this.createQueryBuilder('orders')
        .select(`planning_ssn as plannedSeason,item_cd as itemCode,item as itemName, order_plan_qty as orderQty,wh as whDate,
        MONTH(STR_TO_DATE(wh, '%m/%d')) AS whMonth,exf as exfDate,
        MONTH(STR_TO_DATE(exf, '%m/%d')) AS exfMonth,year`)
        return await query.getRawMany()
    }
    async getProdPlanCount(): Promise<any[]> {
        const query = this.createQueryBuilder('orders')
            .select(`prod_plan_type , COUNT(prod_plan_type) AS count`)
            .groupBy(`prod_plan_type`)
        return await query.getRawMany();
    }
}