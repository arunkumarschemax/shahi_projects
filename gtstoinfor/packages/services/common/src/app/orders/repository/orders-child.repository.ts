import { Repository, getConnection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../entities/orders-child.entity";
import { OrdersEntity } from "../entities/orders.entity";
import { AppDataSource } from "../../app-datasource";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";
import { FileIdReq } from "../models/file-id.req";
import { CommonResponseModel } from "@project-management-system/shared-models";

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
        console.log(req)
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
            .select('production_plan_id, item_code, itemName, file_id as version, created_at,order_qty_pcs')
        return await query.getRawMany();
    }

    async getItemQtyChangeData(fileId1: number, fileId2: number): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` item_code, itemName , SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS old_qty_value, SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) AS new_qty_value ,  SUM(CASE WHEN file_id = ${fileId2} THEN order_qty_pcs ELSE 0 END) - SUM(CASE WHEN file_id = ${fileId1} THEN order_qty_pcs ELSE 0 END) AS diff `)
            .groupBy(` item_code`)
        return await query.getRawMany();
    }

}