import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "../entities/orders.entity";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";
import { CompareOrdersFilterReq, SeasonWiseRequest, YearReq, orders } from "@project-management-system/shared-models";
import { groupBy } from "rxjs";

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
    constructor(@InjectRepository(OrdersEntity) private orderRepository: Repository<OrdersEntity>
    ) {
        super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
    }

    async getOrdersData(req: orders): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.production_plan_id, o.planning_sum, o.coeff,o.order_plan_number,o.wh,o.biz,o.prod_plan_type,o.order_plan_qty,o.year,o.planning_ssn,o.exf_etd,o.etd_wh,o.sample,o.exf,o.core_category`)
            // if (req.plannedFromDate !== undefined) {
            //     query.andWhere(`Date(o.planned_exf) BETWEEN '${req.plannedFromDate}' AND '${req.plannedToDate}'`)
            // }
            if(req.OrderPlanNum){
                query.andWhere(`o.order_plan_number = '${req.OrderPlanNum}'`)
            }
            // if(req?.PoOrderStatus){
            //     query.andWhere(`o.po_order_status = '${req.PoOrderStatus}'`)
            // }
            query.orderBy(` o.production_plan_id`, 'ASC')
        return await query.getRawMany();
    }

    async getQtyChangeData(req:CompareOrdersFilterReq,lat,pre): Promise<any[]> {
        const query = this.createQueryBuilder('o')
        .select(`o.production_plan_id,o.planning_sum,o.prod_plan_type,o.created_at,REPLACE(od.old_val,',','') as old_val,REPLACE(od.new_val,',','') as new_val,(REPLACE(od.new_val,',','') - REPLACE(od.old_val,',','')) AS Diff,od.version,o.order_plan_number,o.wh,o.exf,o.year`)
            .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
            .where(`column_name = 'order_plan_qty' AND o.version = od.version AND o.prod_plan_type != 'STOP' AND od.file_id IN (${lat},${pre}) AND od.old_val != od.new_val`)
        
            if(req.orderNumber){
                query.andWhere(`o.order_plan_number = '${req.orderNumber}'`)
            }
            // if(req.itemCode){
            //     query.andWhere(`o.item_cd = '${req.itemCode}'`)
            // }
            if(req.itemName){
                query.andWhere(`o.planning_sum = "${req.itemName}"`)
            }
            if(req.warehouseFromDate){
                query.andWhere(`o.wh BETWEEN ${req.warehouseFromDate} AND ${req.warehouseToDate}`)
            }
            if(req.exFactoryFromDate){
                query.andWhere(`o.exf BETWEEN '${req.exFactoryFromDate}' AND '${req.exFactoryToDate}'`)
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
        const query = `SELECT planning_sum,prod_plan_type,
        SUM(janExfPcs) AS janPcsExf,SUM(febExfPcs) AS febPcsExf,SUM(marExfPcs) AS marPcsExf,SUM(aprExfPcs) AS aprPcsExf,SUM(mayExfPcs) AS mayPcsExf,SUM(junExfPcs) AS junPcsExf,SUM(julExfPcs) AS julPcsExf,SUM(augExfPcs) AS augPcsExf,SUM(sepExfPcs) AS sepPcsExf,SUM(octExfPcs) AS octPcsExf,SUM(novExfPcs) AS novPcsExf,SUM(decExfPcs) AS decPcsExf,
        SUM(janWhPcs) AS janPcsWh,SUM(febWhPcs) AS febPcsWh,SUM(marWhPcs) AS marPcsWh,SUM(aprWhPcs) AS aprPcsWh,SUM(mayWhPcs) AS mayPcsWh,SUM(junWhPcs) AS junPcsWh,SUM(julWhPcs) AS julPcsWh,SUM(augWhPcs) AS augPcsWh,SUM(sepWhPcs) AS sepPcsWh,SUM(octWhPcs) AS octPcsWh,SUM(novWhPcs) AS novPcsWh,SUM(decWhPcs) AS decPcsWh,
        SUM(janExfCoeff) AS janCoeffExf,SUM(febExfCoeff) AS febCoeffExf,SUM(marExfCoeff) AS marCoeffExf,SUM(aprExfCoeff) AS aprCoeffExf,SUM(mayExfCoeff) AS mayCoeffExf,SUM(junExfCoeff) AS junCoeffExf,SUM(julExfCoeff) AS julCoeffExf,SUM(augExfCoeff) AS augCoeffExf,SUM(sepExfCoeff) AS sepCoeffExf,SUM(octExfCoeff) AS octCoeffExf,SUM(novExfCoeff) AS novCoeffExf,SUM(decExfCoeff) AS decCoeffExf,
        SUM(janWhCoeff) AS janCoeffWh,SUM(febWhCoeff) AS febCoeffWh,SUM(marWhCoeff) AS marCoeffWh,SUM(aprWhCoeff) AS aprCoeffWh,SUM(mayWhCoeff) AS mayCoeffWh,SUM(junWhCoeff) AS junCoeffWh,SUM(julWhCoeff) AS julCoeffWh,SUM(augWhCoeff) AS augCoeffWh,SUM(sepWhCoeff) AS sepCoeffWh,SUM(octWhCoeff) AS octCoeffWh,SUM(novWhCoeff) AS novCoeffWh,SUM(decWhCoeff) AS decCoeffWh,
        SUM(janExfPcs + febExfPcs + aprExfPcs + marExfPcs + mayExfPcs + junExfPcs + julExfPcs + augExfPcs + sepExfPcs + octExfPcs + novExfPcs + decExfPcs) AS ExfPcsTotal,
        SUM(janWhPcs + febWhPcs + aprWhPcs + marWhPcs + mayWhPcs + junWhPcs + julWhPcs + augWhPcs + sepWhPcs + octWhPcs + novWhPcs + decWhPcs) AS WhPcsTotal,
        SUM(janExfCoeff + febExfCoeff + aprExfCoeff + marExfCoeff + mayExfCoeff + junExfCoeff + julExfCoeff + augExfCoeff + sepExfCoeff + octExfCoeff + novExfCoeff + decExfCoeff) AS ExfCoeffTotal,
        SUM(janWhCoeff + febWhCoeff + aprWhCoeff + marWhCoeff + mayWhCoeff + junWhCoeff + julWhCoeff + augWhCoeff + sepWhCoeff + octWhCoeff + novWhCoeff + decWhCoeff) AS WhCoeffTotal
        ,file_id FROM (        
               SELECT YEAR, planning_sum,prod_plan_type,file_id,
               ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS janExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS febExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS marExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS aprExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS mayExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS junExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS julExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS augExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS sepExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS octExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS novExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS decExfPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS janWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS febWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS marWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS aprWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS mayWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS junWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS julWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS augWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS sepWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS octWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS novWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS decWhPcs,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS janExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS febExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS marExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS aprExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS mayExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS junExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS julExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS augExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS sepExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS octExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS novExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS decExfCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS janWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS febWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS marWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS aprWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS mayWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS junWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS julWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS augWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS sepWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS octWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS novWhCoeff,
                ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS decWhCoeff
                FROM orders
                WHERE exf IS NOT NULL 
                AND file_id = (SELECT MAX(file_id) FROM orders) AND YEAR ='${req.year}'
                GROUP BY prod_plan_type, planning_sum
              ) AS subquery
              WHERE 1 = 1 AND YEAR ='${req.year}' AND prod_plan_type != 'STOP' 
             AND file_id = (SELECT MAX(file_id) FROM orders)
               GROUP BY prod_plan_type, planning_sum 
               HAVING ExfPcsTotal != 0 AND WhPcsTotal != 0 AND ExfCoeffTotal!= 0 AND WhCoeffTotal !=0
               ORDER BY planning_sum`;
        const result = await this.query(query);
        return result;
    }







    async getMonthWiseReportDataNew(req:YearReq): Promise<any[]>{
        // console.log(req)
        // console.log('#######################################')
        let query='SELECT MONTH(exf_date),planning_ssn,YEAR, planning_sum,prod_plan_type,file_id,CONCAT(MONTHNAME(wh_date),YEAR) AS whMonthName,CONCAT(MONTHNAME(exf_date),YEAR) AS exfMonthName,ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END)) AS exfPcs,ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END)) AS whPcs,ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END)) AS whCoeff, ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END)) AS exfCoeff FROM orders WHERE file_id = (SELECT MAX(file_id) FROM orders) AND YEAR ="'+req.year+'" AND prod_plan_type != "STOP" '
        if(req.itemName){
            query=query+' and planning_sum="'+req.itemName+'" GROUP BY MONTH(exf_date),planning_sum,prod_plan_type  ORDER BY MONTH(exf_date),planning_sum'
        }
        if(req.tabName === 'ExFactory'){
            query=query+' GROUP BY MONTH(exf_date),planning_sum,prod_plan_type  ORDER BY MONTH(exf_date),planning_sum'
        }
        if(req.tabName === 'WareHouse'){
            query=query+' GROUP BY MONTH(wh_date),planning_sum,prod_plan_type  ORDER BY MONTH(wh_date),planning_sum'
        }
        // else{
        //     query=query+' ORDER BY planning_sum'
        // }
        const result = await this.query(query)
        return result
    }




async getdata(req: YearReq): Promise<any[]> {
    const query = 
    `  SELECT  YEAR,file_id,
    CASE
         WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
         WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
         WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
         ELSE prod_plan_type
     END AS prod_plan_type,
ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END))  AS totalExfPcs,
ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END))AS totalExfCoeff,
                       
ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)) AS totalWhPcs,
ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) AS totalWhCoeff,

ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS janExfPcs,
 ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS febExfPcs,
  ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS marExfPcs,
  ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS aprExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS mayExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS junExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS julExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS augExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS sepExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS octExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS novExfPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS decExfPcs,
    ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS janWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS febWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS marWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS aprWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS mayWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS junWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS julWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS augWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS sepWhPcs,
   ROUND(SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS octWhPcs,
   ROUND(SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS novWhPcs,
   ROUND(SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END)) AS decWhPcs,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS janExfCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS febExfCoeff,
ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS marExfCoeff,
  ROUND( SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS aprExfCoeff,
  ROUND( SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS mayExfCoeff,
 ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS junExfCoeff,
 ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS julExfCoeff,
  ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS augExfCoeff,
  ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS sepExfCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS octExfCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS novExfCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS decExfCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS janWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS febWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS marWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS aprWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS mayWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS junWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS julWhCoeff,
  ROUND( SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS augWhCoeff,
   ROUND(SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS sepWhCoeff,
  ROUND( SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS octWhCoeff,
  ROUND( SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS novWhCoeff,
 ROUND( SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN REPLACE(order_plan_qty_coeff,',','') ELSE 0 END)) AS decWhCoeff
   FROM orders
   WHERE exf IS NOT NULL AND YEAR = '${req.year}'
   AND file_id = (SELECT MAX(file_id) FROM orders)
    AND prod_plan_type !='STOP'
    GROUP BY  CASE
         WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
         WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
         WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
         ELSE prod_plan_type
     END
     HAVING totalWhCoeff != 0 AND totalWhPcs != 0 AND totalExfCoeff != 0 AND totalExfPcs != 0 `
  
    const result = await this.query(query);
    return result;
  }
      
    async getExfactoryYearData(): Promise<any> {
        const query = this.createQueryBuilder('o')
            .select(`o.year as year`)
            .where(`o.order_plan_qty != '0'AND o.order_plan_qty_coeff != '0'`)
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
        .select(`planning_ssn as plannedSeason,planning_sum as itemName, order_plan_qty as orderQty,wh as whDate,
        MONTH(STR_TO_DATE(wh, '%m/%d')) AS whMonth,exf as exfDate,
        MONTH(STR_TO_DATE(STR_TO_DATE(exf, '%Y-%m-%d'), '%m/%d')) AS exfMonth,year`)
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
        .select(`planning_sum as itemCode`)
        .groupBy('planning_sum')
        .orderBy(`planning_sum`)
        return await query.getRawMany()
    }

    async getSeasonWiseItemName(req:SeasonWiseRequest):Promise<any[]>{
        const query = await this.createQueryBuilder('orders') 
        .select(`planning_sum as itemName,year, planning_ssn AS plannedSeason, file_id`)
        .where(`file_id = (SELECT MAX(file_id) FROM orders) and year = ${req.year} and planning_ssn = '${req.season}'`)
        .groupBy('planning_sum')
        .orderBy(`planning_sum`)
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
        SELECT  YEAR,file_id,
          CASE
               WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
               WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
               WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
               ELSE prod_plan_type
           END AS prod_plan_type,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)) *100,0),'%')  AS totalExfPcs,
        CONCAT(ROUND((SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS totalExfCoeff,
        CONCAT(ROUND( (SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%')  AS totalWhPcs,
        CONCAT(ROUND( (SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS totalWhCoeff,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS janExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS febExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS marExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS aprExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS mayExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS junExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS julExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS augExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS sepExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS octExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS novExfPcs,
        CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 THEN order_plan_qty ELSE 0 END)/  SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty, ',', '') ELSE 0 END) ) *100,0),'%') AS decExfPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS janWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS febWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS marWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) =4 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS aprWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) =5 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS mayWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) =6 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS junWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) =7 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS julWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) =8 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS augWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) =9 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS sepWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS octWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS novWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN order_plan_qty ELSE 0 END)/SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty, ',', '')ELSE 0 END)) *100,0),'%') AS decWhPcs,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS janExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS febExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS marExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS aprExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS mayExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS junExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS julExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS augExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS sepExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS octExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS novExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m-%d'))  BETWEEN 1 AND 12 THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS decExfCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS janWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS febWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS marWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS aprWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS mayWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS junWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS julWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS augWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS sepWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS octWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS novWhCoeff,
         CONCAT(ROUND( (SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN order_plan_qty_coeff ELSE 0 END)/SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m-%d'))  BETWEEN 1 AND 12  THEN REPLACE(order_plan_qty_coeff, ',', '') ELSE 0 END)) *100,0),'%') AS decWhCoeff
         FROM orders
         WHERE exf IS NOT NULL AND YEAR = '${req.year}'
         AND file_id = (SELECT MAX(file_id) FROM orders)
         AND prod_plan_type !='STOP'
          GROUP BY  CASE
               WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
               WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
               WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
               ELSE prod_plan_type
           END
           HAVING totalWhCoeff != 0 AND totalWhPcs != 0 AND totalExfCoeff != 0 AND totalExfPcs != 0`
     
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

  async getItemWiseQtyChangeData(req:CompareOrdersFilterReq,lat,pre): Promise<any[]> {
    const query = this.createQueryBuilder('o')
    .select(`o.production_plan_id,o.prod_plan_type,o.created_at,SUM(REPLACE(od.old_val,',','')) as old_qty_value,SUM(REPLACE(od.new_val,',','')) as new_qty_value,(SUM(REPLACE(od.new_val,',','')) - SUM(REPLACE(od.old_val,',',''))) AS diff,od.version,o.order_plan_number,o.wh,o.exf,o.year,o.planning_sum`)
        .leftJoin(OrdersDifferenceEntity, 'od', 'od.prod_plan_id = o.production_plan_id')
        .where(`column_name = 'order_plan_qty' AND o.version = od.version AND o.prod_plan_type != 'STOP' AND od.file_id IN (${lat},${pre}) AND od.old_val != od.new_val`)
    
        if(req.orderNumber){
            query.andWhere(`o.order_plan_number = '${req.orderNumber}'`)
        }
        // if(req.itemCode){
        //     query.andWhere(`o.item_cd = '${req.itemCode}'`)
        // }
        if(req.itemName){
            query.andWhere(`o.planning_sum = "${req.itemName}"`)
        }
        if(req.warehouseFromDate){
            query.andWhere(`o.wh BETWEEN ${req.warehouseFromDate} AND ${req.warehouseToDate}`)
        }
        if(req.exFactoryFromDate){
            query.andWhere(`o.exf BETWEEN '${req.exFactoryFromDate}' AND '${req.exFactoryToDate}'`)
        }
        if(req.year){
            query.andWhere(`o.year = '${req.year}'`)
        }
        query.groupBy(`o.planning_sum`)
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

async getDataNew(req:YearReq):Promise<any[]>{
    let query='SELECT planning_sum, YEAR,file_id,CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3" WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2" WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1" ELSE prod_plan_type END AS prod_plan_type,CONCAT(MONTHNAME(exf_date),YEAR(exf_date)) AS exfMonth,CONCAT(MONTHNAME(wh_date),YEAR(wh_date)) AS whMonth,ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END)) AS exfPcs,ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END)) AS whPcs,ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END)) AS whCoeff,ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END)) AS exfCoeff FROM orders WHERE exf IS NOT NULL AND YEAR = '+req.year+' AND file_id = (SELECT MAX(file_id) FROM orders)  AND prod_plan_type !="STOP"  '
    if(req.itemName){
        query=query+' and planning_sum="'+req.itemName+'"'
    }
    query=query+' GROUP BY  CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3" WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2"  WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1"  ELSE prod_plan_type  END,MONTH(exf_date),MONTH(wh_date)'

    const result = await this.query(query)
    return result

}

async getData1New(req:YearReq):Promise<any[]>{
    let query=' SELECT  YEAR,file_id,CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3"  WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2"  WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1" ELSE prod_plan_type  END AS prod_plan_type, CONCAT(MONTHNAME(exf_date),YEAR(exf_date)) AS exfMonth,CONCAT(MONTHNAME(wh_date),YEAR(wh_date)) AS whMonth,ROUND(ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty,",","")) AS total FROM orders WHERE YEAR="'+req.year+'")*100) AS exfper,ROUND(ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty,",","")) AS total FROM orders WHERE YEAR="'+req.year+'")*100) AS whper,ROUND(ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty_coeff,",","")) AS total FROM orders WHERE YEAR="'+req.year+'")*100) AS whcoefper,ROUND(ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty_coeff,",","")) AS total FROM orders WHERE YEAR="'+req.year+'")*100) AS exfcoefper FROM orders WHERE exf IS NOT NULL AND YEAR = "'+req.year+'" AND file_id = (SELECT MAX(file_id) FROM orders)  AND prod_plan_type !="STOP"'
    if(req.itemName){
        query=query+' and planning_sum="'+req.itemName+'"'
    }
    query=query+'  GROUP BY  CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3" WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2" WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1" ELSE prod_plan_type END, MONTH(exf_date),MONTH(wh_date)'
    const result = await this.query(query)
    return result
}

async getFinalNewData(req:YearReq):Promise<any[]>{
   const  query='SELECT  YEAR,file_id,CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3" WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2" WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1"   ELSE prod_plan_type END AS prod_plan_type,CONCAT(MONTHNAME(exf_date),YEAR(exf_date)) AS exfMonth, CONCAT(MONTHNAME(wh_date),YEAR(wh_date)) AS whMonth,ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END)) AS exfPcs,ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END)) AS whPcs,ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END)) AS whCoeff,ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END)) AS exfCoeff FROM orders   WHERE exf IS NOT NULL AND YEAR = "'+req.year+'"   AND file_id = (SELECT MAX(file_id) FROM orders)   AND prod_plan_type !="STOP" GROUP BY  CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3"     WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2"     WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1"     ELSE prod_plan_type END ,MONTH(exf_date),MONTH(wh_date),YEAR(exf_date),YEAR(wh_date) UNION ALL        SELECT  YEAR,file_id,   CASE WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3"  WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2" WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1"  ELSE prod_plan_type  END AS prod_plan_type,  CONCAT(MONTHNAME(exf_date),YEAR(exf_date)) AS exfMonth,  CONCAT(MONTHNAME(wh_date),YEAR(wh_date)) AS whMonth,   CONCAT((ROUND(ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty,",","")) AS total FROM orders WHERE YEAR="2024")*100)),"%") AS exfper,  CONCAT((ROUND(ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty,",","")) AS total FROM orders WHERE YEAR="2024")*100)),"%") AS whper, CONCAT( (ROUND(ROUND(SUM(CASE WHEN MONTH(wh_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty_coeff,",","")) AS total FROM orders WHERE YEAR="'+req.year+'")*100)),"%") AS whcoefper, CONCAT(( ROUND(ROUND(SUM(CASE WHEN MONTH(exf_date) THEN REPLACE(order_plan_qty_coeff,",","") ELSE 0 END))/(SELECT SUM(REPLACE(order_plan_qty_coeff,",","")) AS total FROM orders WHERE YEAR="'+req.year+'")*100)),"%") AS exfcoefper  FROM orders WHERE exf IS NOT NULL AND YEAR = "'+req.year+'"   AND file_id = (SELECT MAX(file_id) FROM orders)  AND prod_plan_type !="STOP"  GROUP BY  CASE  WHEN prod_plan_type LIKE "%Ph3%" THEN "Ph3"  WHEN prod_plan_type LIKE "%Ph2%" THEN "Ph2"  WHEN prod_plan_type LIKE "%Ph1%" THEN "Ph1" ELSE prod_plan_type END, MONTH(exf_date),MONTH(wh_date)'
    const result = await this.query(query)
    return result

}

} 