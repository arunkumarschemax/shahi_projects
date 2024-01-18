import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
import { PurchaseOrderEntity } from "../entities/purchase-order-entity";

@Injectable()
export class PurchaseOrderRepository extends Repository<PurchaseOrderEntity> {
    constructor(@InjectRepository(PurchaseOrderEntity) private userRepository: Repository<PurchaseOrderEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    
    async getPOFabricData(req:Date):Promise<any>{
        const query = await this.createQueryBuilder('po')
        .select(`COUNT(po_number) AS COUNT`)
        .where(`DATE(created_at) = '${req}'`)
        return query.getRawMany()
    }
}