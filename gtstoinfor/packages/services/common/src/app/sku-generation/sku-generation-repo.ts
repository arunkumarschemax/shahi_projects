import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemSkus } from "./sku-generation.entity";
import { SKUlistFilterRequest, SkuStatusEnum } from "@project-management-system/shared-models";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";

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

    async getDataByItem(itemCode:string):Promise<any>{
        const query = await this.createQueryBuilder('is')
        .select(`*`)
        // .leftJoin(Colour,`c`,`c.colourId = is.color_id`)
        // .leftJoin(Size,`s`,`s.size_id = is.size_id`)
        // .leftJoin(Destination,`d`,`d.destination_id = is.destination_id`)
        .where(`is.itemCode = '${itemCode}'`)
        .groupBy(`is.color,is.size,is.destination`)
        return query.getRawMany()

    }

    async getItemCode():Promise<any>{
        const query = await this.createQueryBuilder('i')
        .select(`item_code,item_id `)
        .groupBy(`item_code`)
        return await query.getRawMany()
    }

    async getSkuList(req:SKUlistFilterRequest):Promise<any>{
        const query = await this.createQueryBuilder('is')
        .select(`*`)
        // .leftJoin(Colour,`c`,`c.colourId = is.color_id`)
        // .leftJoin(Size,`s`,`s.size_id = is.size_id`)
        // .leftJoin(Destination,`d`,`d.destination_id = is.destination_id`)
        .where(`is.item_id = '${req.itemNoId}'`)
        .groupBy(`is.color,is.size,is.destination`)
        return query.getRawMany()

    }

}