import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "../entities/orders.entity";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";
import { CompareOrdersFilterReq, YearReq, orders } from "@project-management-system/shared-models";
import { groupBy } from "rxjs";

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
            .select(`o.production_plan_id, o.item_cd, o.itemName, o.order_status, o.fr_fabric_name, o.order_qty_pcs, o.contracted_date, od.created_at,o.last_update_date ,od.old_val, od.new_val, od.version`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(` column_name='requested_wh_date' ORDER BY od.created_at DESC`)
        return await query.getRawMany();
    }

    async getContractDateChangeData(): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.item_cd, o.itemName, o.order_status, o.fr_fabric_name, o.order_qty_pcs, o.requested_wh_date, od.created_at ,o.last_update_date, od.old_val, od.new_val, od.version`)
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

    async getMonthWiseReportData(req: YearReq): Promise<any[]>{
        const query = `SELECT item,item_cd,prod_plan_type,
  SUM(janExfPcs) AS janPcsExf,SUM(febExfPcs) AS febPcsExf,SUM(marExfPcs) AS marPcsExf,SUM(aprExfPcs) AS aprPcsExf,SUM(mayExfPcs) AS mayPcsExf,SUM(junExfPcs) AS junPcsExf,SUM(julExfPcs) AS julPcsExf,SUM(augExfPcs) AS augPcsExf,SUM(sepExfPcs) AS sepPcsExf,SUM(octExfPcs) AS octPcsExf,SUM(novExfPcs) AS novPcsExf,SUM(decExfPcs) AS decPcsExf,
  SUM(janWhPcs) AS janPcsWh,SUM(febWhPcs) AS febPcsWh,SUM(marWhPcs) AS marPcsWh,SUM(aprWhPcs) AS aprPcsWh,SUM(mayWhPcs) AS mayPcsWh,SUM(junWhPcs) AS junPcsWh,SUM(julWhPcs) AS julPcsWh,SUM(augWhPcs) AS augPcsWh,SUM(sepWhPcs) AS sepPcsWh,SUM(octWhPcs) AS octPcsWh,SUM(novWhPcs) AS novPcsWh,SUM(decWhPcs) AS decPcsWh,
  SUM(janExfCoeff) AS janCoeffExf,SUM(febExfCoeff) AS febCoeffExf,SUM(marExfCoeff) AS marCoeffExf,SUM(aprExfCoeff) AS aprCoeffExf,SUM(mayExfCoeff) AS mayCoeffExf,SUM(junExfCoeff) AS junCoeffExf,SUM(julExfCoeff) AS julCoeffExf,SUM(augExfCoeff) AS augCoeffExf,SUM(sepExfCoeff) AS sepCoeffExf,SUM(octExfCoeff) AS octCoeffExf,SUM(novExfCoeff) AS novCoeffExf,SUM(decExfCoeff) AS decCoeffExf,
  SUM(janWhCoeff) AS janCoeffWh,SUM(febWhCoeff) AS febCoeffWh,SUM(marWhCoeff) AS marCoeffWh,SUM(aprWhCoeff) AS aprCoeffWh,SUM(mayWhCoeff) AS mayCoeffWh,SUM(junWhCoeff) AS junCoeffWh,SUM(julWhCoeff) AS julCoeffWh,SUM(augWhCoeff) AS augCoeffWh,SUM(sepWhCoeff) AS sepCoeffWh,SUM(octWhCoeff) AS octCoeffWh,SUM(novWhCoeff) AS novCoeffWh,SUM(decWhCoeff) AS decCoeffWh,
  SUM(janExfPcs + febExfPcs + aprExfPcs + marExfPcs + mayExfPcs + junExfPcs + julExfPcs + augExfPcs + sepExfPcs + octExfPcs + novExfPcs + decExfPcs) AS ExfPcsTotal,
  SUM(janWhPcs + febWhPcs + aprWhPcs + marWhPcs + mayWhPcs + junWhPcs + julWhPcs + augWhPcs + sepWhPcs + octWhPcs + novWhPcs + decWhCoeff) AS WhPcsTotal,
  SUM(janExfCoeff + febExfCoeff + aprExfCoeff + marExfCoeff + mayExfCoeff + junExfCoeff + julExfCoeff + augExfCoeff + sepExfCoeff + octExfCoeff + novExfCoeff + decExfCoeff) AS ExfCoeffTotal,
  SUM(janWhCoeff + febWhCoeff + aprWhCoeff + marWhCoeff + mayWhCoeff + junWhCoeff + julWhCoeff + augWhCoeff + sepWhCoeff + octWhCoeff + novWhCoeff + decWhCoeff) AS WhCoeffTotal
  FROM (        
         SELECT item, YEAR, item_cd,prod_plan_type,
          SUM(CASE WHEN MONTH(planned_exf) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS janExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS febExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS marExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS aprExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS mayExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS junExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS julExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS augExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS sepExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS octExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS novExfPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS decExfPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS janWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS febWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS marWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS aprWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS mayWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS junWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS julWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS augWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS sepWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS octWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS novWhPcs,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS decWhPcs,
          SUM(CASE WHEN MONTH(planned_exf) = 1 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS janExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 2 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS febExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 3 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS marExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 4 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS aprExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 5 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS mayExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 6 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS junExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 7 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS julExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 8 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS augExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 9 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS sepExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 10 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS octExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 11 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS novExfCoeff,
          SUM(CASE WHEN MONTH(planned_exf) = 12 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS decExfCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 1 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS janWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 2 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS febWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 3 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS marWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 4 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS aprWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 5 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS mayWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 6 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS junWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 7 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS julWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 8 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS augWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 9 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS sepWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 10 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS octWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 11 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS novWhCoeff,
          SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 12 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END) AS decWhCoeff
          FROM orders
          WHERE planned_exf IS NOT NULL
          GROUP BY prod_plan_type, item_cd, item
        ) AS subquery
        WHERE 1 = 1 AND YEAR ='${req.year}' AND prod_plan_type != 'STOP' 
         GROUP BY prod_plan_type, item_cd, item ORDER BY item_cd`;
        const result = await this.query(query);
        return result;
    }

    async getdata(req: YearReq): Promise<any[]> {
        const query = 
        `SELECT 
       
    CASE
    WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
     WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
     WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
     ELSE prod_plan_type
 END AS prod_plan_type,
  
         
        ROUND(SUM(CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2))), 0) AS total_order_plan_qty_coeff,
        ROUND(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) AS total_order_plan_qty,
        ROUND(SUM(CASE WHEN MONTH(wh) = 1 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS janWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 2 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS febWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 3 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS marWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 4 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS aprWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 5 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS mayWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 6 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS junWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 7 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS julWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 8 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS augWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 9 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS sepWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 10 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS octWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 11 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS novWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(wh) = 12 THEN CAST(REPLACE(order_plan_qty_coeff, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS decWhCoeff,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 1 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS janExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 2 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS febExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 3 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS marExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 4 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS aprExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 5 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS mayExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 6 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS junExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 7 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS julExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 8 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS augExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 9 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS sepExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 10 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS octExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 11 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS novExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS decExfCoeff, 
        ROUND(SUM(CASE WHEN MONTH(wh) = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS janPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 2 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS febPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 3 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS marPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 4 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS aprPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 5 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS mayPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 6 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS junPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 7 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS julPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 8 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS augPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 9 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS sepPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 10 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS octPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 11 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS novPcsWh,
        ROUND(SUM(CASE WHEN MONTH(wh) = 12 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END), 0) AS decPcsWh,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 1 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS janPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 2 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS febPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 3 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS marPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 4 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS aprPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 5 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS mayPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 6 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS junPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 7 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS julPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 8 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS augPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 9 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS sepPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 10 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS octPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 11 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS novPcsExf,
        ROUND(SUM(CASE WHEN MONTH(planned_exf) = 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END), 0) AS decPcsExf
    FROM orders
    WHERE prod_plan_type != 'STOP' 
    GROUP BY
     CASE
            WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
            WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
            WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
            ELSE prod_plan_type
        END
    ORDER BY
        prod_plan_type`;
      
        const result = await this.query(query);
        return result;
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

    async getPhaseMonthData(year:number):Promise<any>{
        const query =this.createQueryBuilder(`order`)
        .select(`o.item,o.item_cd,o.wh,o.year,o.order_plan_qty_coeff,o.order_plan_qty,o.prod_plan_type,
        MONTH(STR_TO_DATE(wh, '%m/%d')) AS whMonth`)
        .where(`o.year ='${year}'`)
       .groupBy(`order.prod_plan_type`)
       return await query.getRawMany

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