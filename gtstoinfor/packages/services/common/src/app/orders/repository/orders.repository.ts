import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "../entities/orders.entity";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";
import { CompareOrdersFilterReq, YearReq, orders } from "@project-management-system/shared-models";

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
    constructor(@InjectRepository(OrdersEntity) private orderRepository: Repository<OrdersEntity>
    ) {
        super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
    }

    async getOrdersData(req: orders): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.planning_ssn_cd, o.department, o.planning_sum_code, o.planning_sum, o.item,o.vendor, o.sewing_factory, o.branchFactory, o.coeff, o.publish_date,o.order_plan_number,o.gwh,o.wh,o.raw_material_supplier,o.yarn_order_status,o.fbrc_order_status,o.color_order_status,o.trim_order_status,o.po_order_status,o.planned_exf,o.biz,o.fr_fabric,o.trnsp_mthd,prod_plan_type`)
            if (req.plannedFromDate !== undefined) {
                query.andWhere(`Date(o.planned_exf) BETWEEN '${req.plannedFromDate}' AND '${req.plannedToDate}'`)
            }
            if(req.OrderPlanNumber){
                query.andWhere(`o.order_plan_number = '${req.OrderPlanNumber}'`)
            }
            if(req?.PoOrderStatus){
                query.andWhere(`o.po_order_status = '${req.PoOrderStatus}'`)
            }
            query.orderBy(` o.planning_ssn_cd`, 'ASC')
        return await query.getRawMany();
    }

    async getQtyChangeData(req:CompareOrdersFilterReq): Promise<any[]> {
        const query = this.createQueryBuilder('o')
        .select(`o.production_plan_id,o.item_cd,o.item,o.prod_plan_type,o.fr_fabric,o.created_at,REPLACE(od.old_val,',','') as old_val,REPLACE(od.new_val,',','') as new_val,(REPLACE(od.new_val,',','') - REPLACE(od.old_val,',','')) AS Diff,od.version,o.order_plan_number,o.wh,o.planned_exf,o.year`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(`column_name = 'order_plan_qty'`)
        
            if(req.orderNumber){
                query.andWhere(`o.order_plan_number = '${req.orderNumber}'`)
            }
            if(req.itemCode){
                query.andWhere(`o.item_cd = '${req.itemCode}'`)
            }
            if(req.itemName){
                query.andWhere(`o.item = '${req.itemName}'`)
            }
            if(req.warehouseFromDate){
                query.andWhere(`o.wh BETWEEN ${req.warehouseFromDate} AND ${req.warehouseToDate}`)
            }
            if(req.exFactoryFromDate){
                query.andWhere(`o.planned_exf BETWEEN '${req.exFactoryFromDate}' AND '${req.exFactoryToDate}'`)
            }
            query.orderBy(`o.order_plan_number`)
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

    async getExfactoryMonthData(year:number): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.item,o.item_cd,o.planned_exf,o.year,o.order_plan_qty_coeff,o.order_plan_qty,o.prod_plan_type,
             MONTH(planned_exf) AS ExfMonth`)
            .where(`o.year ='${year}'`)
            // .groupBy(`o.item_cd`)
        return await query.getRawMany();
    }
    async getExfactoryYearData(): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.year as year`)
            .groupBy(`o.year`)
        return await query.getRawMany();
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

    async getWareHouseMonthData(year:number): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.item,o.item_cd,o.wh,o.year,o.order_plan_qty_coeff,o.order_plan_qty,o.prod_plan_type,
            MONTH(STR_TO_DATE(wh, '%m/%d')) AS whMonth`)
            .where(`o.year ='${year}'`)
            // .groupBy(`o.item_cd`)
        return await query.getRawMany();
    }
    async getWareHouseYearData(): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.year as year`)
            .groupBy(`o.year`)
        return await query.getRawMany();
    }
    // async getExfactoryComparisionData(req: YearReq): Promise<any[]> {
    //     const subqueryAlias = 'RankedVersions';
        
    //     const subquery = this.createQueryBuilder()
    //       .select(`year,
    //                  planned_exf,
    //                  order_plan_number,
    //                  "version",
    //                  "phase",
    //                  order_plan_qty,
    //                  ROW_NUMBER() OVER (PARTITION BY order_plan_number ORDER BY "version" DESC) AS version_rank`)
    //       .from('orders_child', 'oc')
    //       .where(`year = :year`, { year: req.year }) // Replace with your desired filter condition
    //       .orderBy(`order_plan_number ASC, "version" DESC`)
    //       .limit(2) // Only get the latest 2 versions per order_plan_number
    //       .getQueryAndParameters();
      
    //     const query = this.createQueryBuilder('o')
    //       .select([
    //         'year',
    //         'planned_exf',
    //         'order_plan_number',
    //         '"version"',
    //         '"phase"',
    //         'order_plan_qty',
    //         `CASE WHEN ${subqueryAlias}.version_rank = 1 THEN 'latest' ELSE 'previous' END AS "ExfMonth"`
    //       ])
    //       .from(`(${subquery[0]})`, subqueryAlias)
    //       .orderBy(`order_plan_number ASC, "version" DESC`);
      
    //     const result = await query.getRawMany();
    //     return result;
    //   }
      
    // async getWareHouseComparisionData(req: YearReq): Promise<any[]> {
    //     const subqueryAlias = 'RankedVersions';
        
    //     const subquery = this.createQueryBuilder()
    //       .select(`year,
    //                  wn,
    //                  order_plan_number,
    //                  "version",
    //                  "phase",
    //                  order_plan_qty,
    //                  ROW_NUMBER() OVER (PARTITION BY order_plan_number ORDER BY "version" DESC) AS version_rank`)
    //       .from('orders_child', 'oc')
    //       .where(`year = :year`, { year: req.year }) 
    //       .orderBy(`order_plan_number ASC, "version" DESC`)
    //       .limit(2) 
    //       .getQueryAndParameters();
      
    //     const query = this.createQueryBuilder('o')
    //       .select([
    //         'year',
    //         'wn',
    //         'order_plan_number',
    //         '"version"',
    //         '"phase"',
    //         'order_plan_qty',
    //         `CASE WHEN ${subqueryAlias}.version_rank = 1 THEN 'latest' ELSE 'previous' END AS "Exf Month"`
    //       ])
    //       .from(`(${subquery[0]})`, subqueryAlias)
    //       .orderBy(`order_plan_number ASC, "version" DESC`);
      
    //     const result = await query.getRawMany();
    //     return result;
    //   }
    
    async getSeasonWiseItemCode():Promise<any[]>{
        const query = await this.createQueryBuilder('orders') 
        .select(`item_cd as itemCode`)
        .groupBy('item_cd')
        .orderBy(`item_cd`)
        return await query.getRawMany()
    }

    async getSeasonWiseItemName():Promise<any[]>{
        const query = await this.createQueryBuilder('orders') 
        .select(`item as itemName`)
        .groupBy('item')
        .orderBy(`item`)
        return await query.getRawMany()
    }

    async getOrdersStatus():Promise<any[]>{
        const query = await this. createQueryBuilder('orders')
        .select(`po_order_status`)
        .where(`po_order_status is not null`)
        .groupBy('po_order_status')
        return await query.getRawMany();
    }
    async getOrderPlanNO():Promise<any[]>{
        const query = await this. createQueryBuilder('orders')
        .select(`order_plan_number`)
        .groupBy('order_plan_number')
        return await query.getRawMany();
    }
} 