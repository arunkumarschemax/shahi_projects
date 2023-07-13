import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../entities/orders-child.entity";
import { OrdersEntity } from "../entities/orders.entity";
import { AppDataSource } from "../../app-datasource";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";

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

    async getLatestRecord (): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
        .select(`oc.production_plan_id`)
        .orderBy(`oc.created_at`, 'DESC')
        .limit(1)
        return await query.getRawMany();
    }

}