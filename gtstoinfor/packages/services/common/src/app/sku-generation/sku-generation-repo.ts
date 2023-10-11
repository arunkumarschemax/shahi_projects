import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemSkus } from "./sku-generation.entity";
import { SkuStatusEnum } from "@project-management-system/shared-models";

@Injectable()
export class ItemSkuRepository extends Repository<ItemSkus> {

    constructor(@InjectRepository(ItemSkus) private itemskuRepo: Repository<ItemSkus>
    ) {
        super(itemskuRepo.target, itemskuRepo.manager, itemskuRepo.queryRunner);
    }

    async getDestinationsByItem(itemCode: string):Promise<any>{
        const query = await this.createQueryBuilder('is')
        .select(`is.destination,is.destination_id`)
        .where(`is.item_sku_id > 0 and is.status = '${SkuStatusEnum.OPEN}'`)
        if(itemCode){
            query.andWhere(`is.item_code = '${itemCode}'`)
        }
        query.orderBy(`is.destination`)
        query.groupBy(`is.destination`)
        return query.getRawMany()
    }

}