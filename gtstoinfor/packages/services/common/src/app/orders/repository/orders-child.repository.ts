import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../entities/orders-child.entity";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";

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

    async getVersionWiseQty(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select('production_plan_id, prod_plan_type_name, item_code, itemName, file_id as version, created_at,order_qty_pcs')
        return await query.getRawMany();
    }

    async getItemQtyChangeData(fileId1: number, fileId2: number): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` item_code, itemName , SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS new_qty_value ,  SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) - SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS diff `)
            .groupBy(` item_code`)
        return await query.getRawMany();
    }

    async getItemQtyChangeData1(fileId2: number): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` item_code, itemName , 0 AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code`)
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
            .select(` item_code, itemName ,'All Phases' as prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId5} THEN order_qty_pcs ELSE 0 END) AS old_qty_value4, SUM(CASE WHEN file_id = ${fileId4} THEN order_qty_pcs ELSE 0 END) AS old_qty_value3, SUM(CASE WHEN file_id = ${fileId3} THEN order_qty_pcs ELSE 0 END) AS old_qty_value2, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS old_qty_value1, SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code`)
            .orderBy(` item_code`)
            .getRawMany()
        const query2 = this.createQueryBuilder('o')
            .select(` item_code, itemName , prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId5} THEN order_qty_pcs ELSE 0 END) AS old_qty_value4, SUM(CASE WHEN file_id = ${fileId4} THEN order_qty_pcs ELSE 0 END) AS old_qty_value3, SUM(CASE WHEN file_id = ${fileId3} THEN order_qty_pcs ELSE 0 END) AS old_qty_value2, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS old_qty_value1, SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code, prod_plan_type_name`)
            .orderBy(` item_code`)
            .getRawMany()
        const data = (await query1).concat(await query2)
        return data
    }

    async getMonthWiseData(fileId2: number, fileId1?: number): Promise<any[]> {
        const query1 = this.createQueryBuilder('o')
            .select(` item_code, itemName ,'All Phases' as prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code`)
            .orderBy(` item_code`)
            .getRawMany()
        const query2 = this.createQueryBuilder('o')
            .select(` item_code, itemName , prod_plan_type_name, SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS new_qty_value `)
            .groupBy(` item_code, prod_plan_type_name`)
            .orderBy(` item_code`)
            .getRawMany()
        const data = (await query1).concat(await query2)
        return data
    }
}