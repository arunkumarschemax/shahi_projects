import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PVHOrdersEntity } from "../entities/pvh-orders.entity";
import { PvhOrderFilter } from "packages/libs/shared-models/src/common/pvh/pvh-order-filter";



@Injectable()
export class PVHOrdersRepository extends Repository<PVHOrdersEntity> {

    constructor(@InjectRepository(PVHOrdersEntity) private PvhOrdersRepo: Repository<PVHOrdersEntity>
    ) {
        super(PvhOrdersRepo.target, PvhOrdersRepo.manager, PvhOrdersRepo.queryRunner);
    }

    async getorderDataForInfo(req?: PvhOrderFilter): Promise<any[]> {
        console.log(req)
        const query = this.createQueryBuilder('o')
            .select(`*`)
        if (req.poNumber !== undefined) {
            query.andWhere(`o.po_number ='${req.poNumber}'`)
        }
        // if (req.color !== undefined) {
        //     query.andWhere(`o.color LIKE :color`, { color: `%${req.color}%` });
        // }
        // if (req.deliveryDateStartDate !== undefined) {
        //     query.andWhere(`STR_TO_DATE(o.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
        // }
       query.andWhere(`o.status != 'ACCEPTED'`);

        return await query.getRawMany()
    }

}