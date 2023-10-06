import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../entities/orders-child.entity";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";
import { CompareOrdersFilterReq, YearReq } from "@project-management-system/shared-models";

@Injectable()
export class OrdersChildRepository extends Repository<OrdersChildEntity> {
    constructor(@InjectRepository(OrdersChildEntity)
    private orderChildRepository: Repository<OrdersChildEntity>
        // @InjectConnection() private readonly connection: Connection
    ) {
        super(orderChildRepository.target, orderChildRepository.manager, orderChildRepository.queryRunner);
    }

    async getVersion(orderPlanNumber: number): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`id,production_plan_id as productionplanId,order_plan_number as orderPlanNumber, version`)
            .where(` order_plan_number = '${orderPlanNumber}'`)
            .orderBy(` version`, 'DESC')
        return await query.getRawMany();
    }

    async getNoOfChangedItem(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.item_code,oc.itemName,oc.production_plan_id,GROUP_CONCAT(oc.version),MAX(oc.version) AS count`)
            .groupBy(`oc.item_code`)
            .orderBy(` MAX(oc.version) `, 'DESC')
            .limit(10)
        return await query.getRawMany();
    }

    async deleteChildData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('oc');
        queryBuilder.where(`file_id = '${req.fileId}'`);
        await queryBuilder.delete().execute();
    }

    async getUpdatedData(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.file_id as fileId`)
            .orderBy(` oc.created_at`, 'DESC')
            .limit(1)
        return await query.getRawMany();
    }

    // async getVersionWiseQty(): Promise<any[]> {
    //     const query = this.createQueryBuilder('oc')
    //         .select('production_plan_id, prod_plan_type, item_cd, item, file_id as version, created_at,order_plan_qty')
    //     return await query.getRawMany();
    // }
          
    async getVersionWiseQty():Promise<any[]>{
        const query =`WITH LatestFileIDs AS (
            SELECT DISTINCT file_id
            FROM orders_child
            WHERE created_at IS NOT NULL
            ORDER BY file_id DESC
            LIMIT 5
        )
        SELECT
            production_plan_id,
            prod_plan_type,
            item_cd,
            item,
            file_id AS VERSION,
            created_at,
            REPLACE(order_plan_qty, ',', '') AS order_plan_qty
        FROM orders_child
        WHERE file_id IN (SELECT file_id FROM LatestFileIDs)
        ORDER BY file_id DESC, created_at DESC`
        const result=await this.query(query);
        return result;
    }
    async getItemQtyChangeData(fileId1: number, fileId2: number,req:CompareOrdersFilterReq): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` item_cd, item , SUM(CASE WHEN file_id = ${fileId1} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS new_qty_value ,  SUM(CASE WHEN file_id = ${fileId2} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) - SUM(CASE WHEN file_id = ${fileId1} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS diff,o.order_plan_number,o.wh,o.planned_exf,o.year,o.version`)
            .where(`o.id > 0`)
            if(req.orderNumber){
                query.andWhere(`o.order_plan_number = '${req.orderNumber}'`)
            }
            if(req.itemCode){
                query.andWhere(`o.item_cd = '${req.itemCode}'`)
            }
            if(req.itemName){
                query.andWhere(`o.item = '${req.itemName}'`)
            }
            if(req.exFactoryFromDate){
                query.andWhere(`o.planned_exf BETWEEN '${req.exFactoryFromDate}' AND '${req.exFactoryToDate}'`)
            }
            query.groupBy(` item_cd`)
            //  console.log(fileId1,"test of quary 1111111111111")
        return await query.getRawMany();
    }

    async getItemQtyChangeData1(fileId2: number,req:CompareOrdersFilterReq): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` item_cd, item , 0 AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS new_qty_value,o.order_plan_number,o.wh,o.planned_exf,o.year,o.version`)
            .where(`o.id > 0`)
            if(req.orderNumber){
                query.andWhere(`o.order_plan_number = '${req.orderNumber}'`)
            }
            if(req.itemCode){
                query.andWhere(`o.item_cd = '${req.itemCode}'`)
            }
            if(req.itemName){
                query.andWhere(`o.item = '${req.itemName}'`)
            }
            if(req.exFactoryFromDate){
                query.andWhere(`o.planned_exf BETWEEN '${req.exFactoryFromDate}' AND '${req.exFactoryToDate}'`)
            }
            query.groupBy(` item_cd`)
            //  console.log(query,"test of quary222222222222")
        return await query.getRawMany();
    }

    async getAllItemCodes(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` item_code `)
            .groupBy(` item_code`)
        return await query.getRawMany();
    }

    async getPhaseWiseData(fileId1: number, fileId2?: number, fileId3?: number, fileId4?: number, fileId5?: number): Promise<any[]> {
        const query1 = this.createQueryBuilder('o')
            .select(` item_code, itemName ,'All Phases' as prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId5 ? fileId5 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value3, SUM(CASE WHEN file_id = ${fileId4 ? fileId4 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value2, SUM(CASE WHEN file_id = ${fileId3 ? fileId3 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value1, SUM(CASE WHEN file_id = ${fileId2 ? fileId2 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code`)
            .orderBy(` item_code`)
            .getRawMany()
        const query2 = this.createQueryBuilder('o')
            .select(` item_code, itemName , prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId5 ? fileId5 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value3, SUM(CASE WHEN file_id = ${fileId4 ? fileId4 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value2, SUM(CASE WHEN file_id = ${fileId3 ? fileId3 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value1, SUM(CASE WHEN file_id = ${fileId2 ? fileId2 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code, prod_plan_type_name`)
            .orderBy(` item_code`)
            .getRawMany()
        const data = (await query1).concat(await query2)
        return data
    }

    async getMonthWiseData(fileId1?: number, fileId2?: number, fileId3?: number, fileId4?: number, fileId5?: number, fileId6?: number, fileId7?: number, fileId8?: number, fileId9?: number, fileId10?: number, fileId11?: number, fileId12?: number): Promise<any[]> {
        const query1 = this.createQueryBuilder('o')
            .select(` item_code, itemName ,'All Phases' as prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId12 ? fileId12 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value12, SUM(CASE WHEN file_id = ${fileId11 ? fileId11 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value11, SUM(CASE WHEN file_id = ${fileId10 ? fileId10 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value10, SUM(CASE WHEN file_id = ${fileId9 ? fileId9 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value9, SUM(CASE WHEN file_id = ${fileId8 ? fileId8 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value8, SUM(CASE WHEN file_id = ${fileId7 ? fileId7 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value7, SUM(CASE WHEN file_id = ${fileId6 ? fileId6 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value6, SUM(CASE WHEN file_id = ${fileId5 ? fileId5 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value5, SUM(CASE WHEN file_id = ${fileId4 ? fileId4 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value4, SUM(CASE WHEN file_id = ${fileId3 ? fileId3 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value3, SUM(CASE WHEN file_id = ${fileId2 ? fileId2 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value2, SUM(CASE WHEN file_id = ${fileId1 ? fileId1 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value1 `)
            .groupBy(` item_code`)
            .orderBy(` item_code`)
            .getRawMany()
        const query2 = this.createQueryBuilder('o')
            .select(` item_code, itemName , prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId12 ? fileId12 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value12, SUM(CASE WHEN file_id = ${fileId11 ? fileId11 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value11, SUM(CASE WHEN file_id = ${fileId10 ? fileId10 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value10, SUM(CASE WHEN file_id = ${fileId9 ? fileId9 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value9, SUM(CASE WHEN file_id = ${fileId8 ? fileId8 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value8, SUM(CASE WHEN file_id = ${fileId7 ? fileId7 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value7, SUM(CASE WHEN file_id = ${fileId6 ? fileId6 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value6, SUM(CASE WHEN file_id = ${fileId5 ? fileId5 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value5, SUM(CASE WHEN file_id = ${fileId4 ? fileId4 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value4, SUM(CASE WHEN file_id = ${fileId3 ? fileId3 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value3, SUM(CASE WHEN file_id = ${fileId2 ? fileId2 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value2, SUM(CASE WHEN file_id = ${fileId1 ? fileId1 : null} THEN order_qty_pcs ELSE 0 END) AS old_qty_value1 `)
            .groupBy(` item_code, prod_plan_type_name`)
            .orderBy(` item_code`)
            .getRawMany()
        const data = (await query1).concat(await query2)
        return data
    }

    // async getlatestFileIdAgainstMonth(): Promise<any[]>{
    //     const query= `SELECT t1.month, t1.file_id as fileId
    //     FROM orders_child t1
    //     INNER JOIN (
    //         SELECT MONTH, MAX(created_at) AS latest_created_at
    //         FROM orders_child
    //         GROUP BY MONTH
    //     ) t2 ON t1.month = t2.month AND t1.created_at = t2.latest_created_at`
    //     const result = await this.query(query)
    //     return result
    // }
    async getMonthlyComparisionData(req: YearReq): Promise<any[]>{
        const query = `WITH RankedVersions AS (
            SELECT
                YEAR,
                VERSION,
                planned_exf,
                wh,
                
                order_plan_qty,
                item,
                item_cd,
                prod_plan_type,
                ROW_NUMBER() OVER (PARTITION BY order_plan_number, item, prod_plan_type ORDER BY VERSION DESC) AS version_rank
            FROM orders_child
        )

        SELECT
            YEAR,
            VERSION,
            planned_exf,
            wh,
            
            item,
            item_cd,
            prod_plan_type,
            MONTH(planned_exf) AS ExfMonth,
            MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) AS WhMonth,
            CASE
                WHEN version_rank = 1 THEN 'latest'
                ELSE 'previous'
            END AS STATUS,
            SUM(CASE WHEN MONTH(planned_exf) = 1 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS janExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 2 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 3 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 4 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 5 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 6 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 7 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 8 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 9 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 10 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 11 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decExfPre,
            SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalExfPre,
            SUM(CASE WHEN MONTH(planned_exf) = 1 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS janExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 2 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS febExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 3 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS marExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 4 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS aprExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 5 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS mayExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 6 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS junExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 7 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS julExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 8 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS augExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 9 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT)ELSE 0 END) AS sepExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 10 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 11 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novExfLat,
            SUM(CASE WHEN MONTH(planned_exf) = 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decExfLat,
            SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalExfLat,
        SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 1  AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',','') AS INT) ELSE 0 END) AS janWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 2 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 3 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 4 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 5 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 6 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 7 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 8 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 9 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  =10 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  =11 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  =12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalWhPre,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d')) = 1  AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS janWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 2 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 3 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 4 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 5 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 6 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 7 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 8 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 9 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  =10 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  =11 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  = 12 AND version_rank  = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decWhLat,
            SUM(CASE WHEN  MONTH(STR_TO_DATE(wh, '%Y-%m-%d'))  BETWEEN 1 AND 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalWhLat

        FROM RankedVersions
        WHERE version_rank <= 2
            AND YEAR = '${req.year}'
            AND prod_plan_type != 'STOP'
            AND planned_exf IS NOT NULL AND wh IS NOT NULL
             GROUP BY YEAR,  item, item_cd, prod_plan_type, STATUS
        ORDER BY  item ASC`;
        const result = await this.query(query);
        return result;
    }


    async getWareHouseComparisionData(req: YearReq): Promise<any[]>{
        const query = `WITH RankedVersions AS (
            SELECT
                year,
                version,   
                wh,
                order_plan_number,
                order_plan_qty,
                item, 
                item_cd, 
                prod_plan_type, 
                ROW_NUMBER() OVER (PARTITION BY order_plan_number ORDER BY version DESC) AS version_rank
            FROM orders_child
            WHERE year = '${req.year}'
        )
        SELECT
            year,
            version,
            wh,
            order_plan_number,          
            order_plan_qty,
            item, 
            item_cd, 
            prod_plan_type, 
            MONTH(STR_TO_DATE(wh, '%m/%d')) AS whMonth,
            CASE
                WHEN version_rank = 1 THEN 'latest'
                ELSE 'previous'
            END AS status
        FROM RankedVersions
        WHERE version_rank <= 2
        ORDER BY order_plan_number, version DESC`;
        
        const result = await this.query(query);
        return result;
    }
    

    async getMonthlyComparisionDate(req: YearReq): Promise<any[]>{
        const query = `WITH RankedVersions AS (
            SELECT
                YEAR,
        created_at,   
        VERSION,     
                ROW_NUMBER() OVER (PARTITION BY order_plan_number ORDER BY VERSION DESC) AS version_rank
            FROM orders_child
        )
        SELECT
            YEAR,
            VERSION,
                created_at as Date,
              CASE
                WHEN version_rank = 1 THEN 'latest'
                ELSE 'previous'
            END AS STATUS
            FROM RankedVersions
        WHERE version_rank <= 2
            AND YEAR = '${req.year}'
           
        GROUP BY YEAR, VERSION,  STATUS
        ORDER BY  VERSION DESC`;
        
        const result = await this.query(query);
        return result;
    }
    async getItemQtyChangeDataItemCode(fileId1: number, fileId2: number): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` id,item_cd, item , SUM(CASE WHEN file_id = ${fileId1} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS new_qty_value ,  SUM(CASE WHEN file_id = ${fileId2} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) - SUM(CASE WHEN file_id = ${fileId1} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS diff `)
            .groupBy(` item_cd`)
            //  console.log(fileId1,"test of quary 1111111111111")
        return await query.getRawMany();
    }

    async getItemQtyChangeData1ItemCode(fileId2: number): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` id,item_cd, item , 0 AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_cd`)
            //  console.log(query,"test of quary222222222222")
        return await query.getRawMany();
    }

    async getOrderNumbers():Promise<any[]>{
        const query = this.createQueryBuilder('o')
            .select(`o.order_plan_number`)
            // .where(`o.column_name = 'order_plan_qty'`)
            .groupBy(`o.order_plan_number`)
            .orderBy(`o.order_plan_number`)
        return await query.getRawMany()
    }
    

    async getComparisionphaseData(req: YearReq):Promise<any[]>{
        const query = `SELECT
        YEAR,
        VERSION,
        CASE
            WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
            WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
            WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
            ELSE prod_plan_type
        END AS prod_plan_type,
        CASE
            WHEN version_rank = 1 THEN 'latest'
            ELSE 'previous'
        END AS STATUS,
                           CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%') AS totalExfPre,
                           CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%') AS totalExfLat,
                           CONCAT(ROUND(SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%') AS totalWhPre,

                           CONCAT(ROUND(SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%') AS totalWhLat,
        CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 1 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%') AS janExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 2 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS febExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 3 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS marExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 4 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS aprExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 5 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS mayExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 6 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS junExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 7 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS julExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 8 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS augExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 9 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS sepExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 10 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS octExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 11 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS novExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS decExfPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 1 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS janExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 2 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS febExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 3 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS marExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 4 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS aprExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 5 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS mayExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 6 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS junExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 7 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS julExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 8 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS augExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 9 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS sepExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 10 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS octExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 11 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS novExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(planned_exf) = 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS decExfLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh) = 1  AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS janWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 2 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS febWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 3 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS marWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 4 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS aprWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 5 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS mayWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 6 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS junWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 7 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS julWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 8 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS augWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 9 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS sepWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  =10 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS octWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  =11 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS novWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS decWhPre,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh) = 1  AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS janWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 2 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS febWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 3 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS marWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 4 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS aprWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 5 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS mayWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 6 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS junWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 7 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS julWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 8 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS augWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 9 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS sepWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  =10 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS octWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  =11 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS novWhLat,
                CONCAT(ROUND(SUM(CASE WHEN MONTH(wh)  = 12 AND version_rank  = 1 THEN CAST(REPLACE(order_plan_qty, ',', '')AS DECIMAL(10, 2)) ELSE 0 END) / NULLIF(SUM(CAST(REPLACE(order_plan_qty, ',', '') AS DECIMAL(10, 2))), 0) * 100, 0), '%')  AS decWhLat
                FROM (
        SELECT
            YEAR,
            VERSION,
            prod_plan_type,
            planned_exf,
            wh,
            order_plan_qty,
            ROW_NUMBER() OVER (PARTITION BY prod_plan_type ORDER BY VERSION DESC) AS version_rank
        FROM orders_child
    ) AS RankedVersions
    WHERE version_rank <= 2
    AND YEAR = '${req.year}'
    AND prod_plan_type != 'STOP'
    GROUP BY
        CASE
            WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
            WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
            WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
            ELSE prod_plan_type
        END,
        YEAR,
        STATUS`
        const result = await this.query(query);
        return result;
    }
   
    async getComparisionphaseData1(req: YearReq):Promise<any[]>{
        const query =` SELECT
        YEAR,
        VERSION,
        CASE
            WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
            WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
            WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
            ELSE prod_plan_type
        END AS prod_plan_type,
        CASE
            WHEN version_rank = 1 THEN 'latest'
            ELSE 'previous'
        END AS STATUS,
       SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalExfPre,
       SUM(CASE WHEN MONTH(planned_exf) BETWEEN 1 AND 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalExfLat,
                          
   SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalWhPre,
  SUM(CASE WHEN MONTH(wh) BETWEEN 1 AND 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS totalWhLat,
               SUM(CASE WHEN MONTH(planned_exf) = 1 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS janExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 2 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 3 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 4 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 5 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 6 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 7 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 8 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 9 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 10 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 11 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decExfPre,
                SUM(CASE WHEN MONTH(planned_exf) = 1 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS janExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 2 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 3 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 4 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 5 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 6 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 7 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 8 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 9 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 10 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 11 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novExfLat,
                SUM(CASE WHEN MONTH(planned_exf) = 12 AND version_rank = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decExfLat,
                SUM(CASE WHEN MONTH(wh) = 1  AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS janWhPre,
                SUM(CASE WHEN MONTH(wh)  = 2 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febWhPre,
                SUM(CASE WHEN MONTH(wh)  = 3 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marWhPre,
                SUM(CASE WHEN MONTH(wh)  = 4 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprWhPre,
                SUM(CASE WHEN MONTH(wh)  = 5 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayWhPre,
                SUM(CASE WHEN MONTH(wh)  = 6 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junWhPre,
                SUM(CASE WHEN MONTH(wh)  = 7 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julWhPre,
                SUM(CASE WHEN MONTH(wh)  = 8 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augWhPre,
                SUM(CASE WHEN MONTH(wh)  = 9 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepWhPre,
                SUM(CASE WHEN MONTH(wh)  =10 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octWhPre,
                SUM(CASE WHEN MONTH(wh)  =11 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novWhPre,
                SUM(CASE WHEN MONTH(wh)  = 12 AND version_rank != 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decWhPre,
                SUM(CASE WHEN MONTH(wh) = 1  AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS janWhLat,
                SUM(CASE WHEN MONTH(wh)  = 2 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS febWhLat,
                SUM(CASE WHEN MONTH(wh)  = 3 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS marWhLat,
                SUM(CASE WHEN MONTH(wh)  = 4 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS aprWhLat,
                SUM(CASE WHEN MONTH(wh)  = 5 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS mayWhLat,
                SUM(CASE WHEN MONTH(wh)  = 6 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS junWhLat,
                SUM(CASE WHEN MONTH(wh)  = 7 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS julWhLat,
                SUM(CASE WHEN MONTH(wh)  = 8 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS augWhLat,
                SUM(CASE WHEN MONTH(wh)  = 9 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS sepWhLat,
                SUM(CASE WHEN MONTH(wh)  =10 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS octWhLat,
                SUM(CASE WHEN MONTH(wh)  =11 AND version_rank = 1  THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS novWhLat,
                SUM(CASE WHEN MONTH(wh)  = 12 AND version_rank  = 1 THEN CAST(REPLACE(order_plan_qty, ',', '') AS INT) ELSE 0 END) AS decWhLat
        FROM (
        SELECT
            YEAR,
            VERSION,
            prod_plan_type,
            planned_exf,
            wh,
            order_plan_qty,
            ROW_NUMBER() OVER (PARTITION BY prod_plan_type ORDER BY VERSION DESC) AS version_rank
        FROM orders_child
        ) AS RankedVersions
        WHERE version_rank <= 2
        AND YEAR = '2023'
        AND prod_plan_type != 'STOP'
        GROUP BY
        CASE
            WHEN prod_plan_type LIKE '%Ph3%' THEN 'Ph3'
            WHEN prod_plan_type LIKE '%Ph2%' THEN 'Ph2'
            WHEN prod_plan_type LIKE '%Ph1%' THEN 'Ph1'
            ELSE prod_plan_type
        END,
        YEAR,
        STATUS`
        
        
        const result = await this.query(query);
        return result
            }
}
