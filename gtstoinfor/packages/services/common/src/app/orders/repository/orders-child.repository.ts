import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../orders-child.entity";

@Injectable()
export class OrdersChildRepository extends Repository<OrdersChildEntity> {
    constructor(@InjectRepository(OrdersChildEntity) private orderChildRepository: Repository<OrdersChildEntity>
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
}