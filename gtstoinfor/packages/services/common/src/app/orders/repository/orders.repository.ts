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
            .select(`o.production_plan_id, o.planning_ssn_cd, o.department, o.planning_sum_code, o.planning_sum, o.item,o.vendor, o.sewing_factory, o.branchFactory, o.coeff, o.publish_date,o.order_plan_number,o.gwh,o.wh,o.raw_material_supplier,o.yarn_order_status,o.fbrc_order_status,o.color_order_status,o.trim_order_status,o.po_order_status,o.planned_exf,o.biz,o.fr_fabric,o.trnsp_mthd,o.prod_plan_type,o.order_plan_qty`)
            if (req.plannedFromDate !== undefined) {
                query.andWhere(`Date(o.planned_exf) BETWEEN '${req.plannedFromDate}' AND '${req.plannedToDate}'`)
            }
            if(req.OrderPlanNum){
                query.andWhere(`o.order_plan_number = '${req.OrderPlanNum}'`)
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
            .where(`column_name = 'order_plan_qty' AND o.version = od.version AND o.prod_plan_type != 'STOP'`)
        
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
            if(req.year){
                query.andWhere(`o.year = '${req.year}'`)
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
    `        
    SELECT  YEAR,
      CASE
           WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
           WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
           WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
           ELSE prod_plan_type
       END AS prod_plan_type,
SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)  AS totalExfPcs,
SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN 
REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)AS totalExfCoeff,
                         
SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) AS totalWhPcs,
 SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END) AS totalWhCoeff,

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
     WHERE planned_exf IS NOT NULL AND YEAR = '${req.year}'
   AND prod_plan_type !='STOP'
      GROUP BY  CASE
           WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
           WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
           WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
           ELSE prod_plan_type
       END`
  
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

    async getdata1(req: YearReq): Promise<any[]> {
        const query =`       
        SELECT  YEAR,
          CASE
               WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
               WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
               WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
               ELSE prod_plan_type
           END AS prod_plan_type,
 CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)) *100,0),'%')  AS totalExfPcs,
   CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS totalExfCoeff,
                             
   CONCAT(ROUND( (SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%')  AS totalWhPcs,
     CONCAT(ROUND( (SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS totalWhCoeff,
   
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 1 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS janExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 2 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS febExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 3 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS marExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 4 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS aprExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 5 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS mayExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 6 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS junExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 7 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS julExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 8 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS augExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 9 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS sepExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 10 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS octExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 11 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS novExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 12 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS decExfPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 1 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS janWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 2 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS febWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 3 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS marWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 4  THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS aprWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 5 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS mayWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 6 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS junWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 7 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS julWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 8 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS augWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 9 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS sepWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 10 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS octWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 11 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS novWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 12 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS decWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 1 THEN  order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS janExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 2 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS febExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 3 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS marExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 4 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS aprExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 5 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS mayExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 6 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS junExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 7 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS julExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 8 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS augExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 9 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS sepExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 10 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS octExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 11 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS novExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(planned_exf) = 12 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS decExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 1 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS janWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 2 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS febWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 3 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS marWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 4 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS aprWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 5 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS mayWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 6 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS junWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 7 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS julWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 8 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS augWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 9 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS sepWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 10 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS octWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 11 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS novWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 12 THEN   order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS decWhCoeff
         FROM orders
         WHERE planned_exf IS NOT NULL AND YEAR = '${req.year}'
       AND prod_plan_type !='STOP'
          GROUP BY  CASE
               WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
               WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
               WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
               ELSE prod_plan_type
           END`
     
    const result = await this.query(query);
    return result;
  }

  async getItemsMonthly():Promise<any[]>{
    const query = this.createQueryBuilder('i')
    .select(`o.item`)
    .groupBy(`o.item`)
    .orderBy(`o.item`)
    return await query.getRawMany()
  }

  async getItemWiseQtyChangeData(req:CompareOrdersFilterReq): Promise<any[]> {
    const query = this.createQueryBuilder('o')
    .select(`o.production_plan_id,o.item_cd,o.item,o.prod_plan_type,o.fr_fabric,o.created_at,SUM(REPLACE(od.old_val,',','')) as old_qty_value,SUM(REPLACE(od.new_val,',','')) as new_qty_value,(SUM(REPLACE(od.new_val,',','')) - SUM(REPLACE(od.old_val,',',''))) AS diff,od.version,o.order_plan_number,o.wh,o.planned_exf,o.year`)
        .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
        .where(`column_name = 'order_plan_qty' AND o.version = od.version AND o.prod_plan_type != 'STOP'`)
    
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
        if(req.year){
            query.andWhere(`o.year = '${req.year}'`)
        }
        query.groupBy(`o.item`)
        query.orderBy(`o.order_plan_number`)
    return await query.getRawMany();
}

async getYearDropdown():Promise<any>{
    const query = this.createQueryBuilder('o')
    .select(`o.year as year`)
    .groupBy(`o.year`)
    .orderBy(`o.year`)
    return await query.getRawMany()
}

} 