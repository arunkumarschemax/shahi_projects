import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { StocksEntity } from "../stocks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { StockFilterRequest, StocksDto } from "@project-management-system/shared-models";

@Injectable()
export class StocksRepository extends Repository<StocksEntity> {
    constructor(@InjectRepository(StocksEntity) private userRepository: Repository<StocksEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getAllItemCode(): Promise<any> {
        const query = await this.createQueryBuilder('stocks')
            .select(`stocks.m3_item_code as m3ItemCode`)
            .where(`stocks.m3_item_code is not null`)
            .orderBy(`stocks.m3_item_code`)
            const data=await query.getRawMany()
        return data;
    }

    async getAllItemType(): Promise<any> {
        const query = await this.createQueryBuilder('stocks')
            .select(`stocks.item_type_id as item_type_id`)
            .where(`stocks.item_type_id is not null`)
            .orderBy(`stocks.item_type_id`)
            const data=await query.getRawMany()
        return data;
    }

    async getAllLocation(): Promise<any> {
        const query = await this.createQueryBuilder('stocks')
            .select(`stocks.location_id as location_id`)
            .where(`stocks.location_id is not null`)
            .orderBy(`stocks.location_id`)
            const data=await query.getRawMany()
        return data;
    }

    async getAllPlant(): Promise<any> {
        const query = await this.createQueryBuilder('stocks')
            .select(`stocks.plant_id as plant_id`)
            .where(`stocks.plant_id is not null`)
            .orderBy(`stocks.plant_id`)
            const data=await query.getRawMany()
        return data;
    }

    async getAllStockReportData(req: StockFilterRequest) {
        let query = this.createQueryBuilder('stocks')
            .select(`b.buyer_name AS buyerName, 
            m3_item_code AS m3ItemCode,item_type_id AS itemType,
            location_id AS location, plant_id AS plant left join buyers b on b.buyer_id = stocks.buyer_id
            left join m3_items it on it.buyer_id = stocks.buyer_id
            `)

        if (req.m3ItemCode !== undefined) {
            query.andWhere(`m3_item_code ='${req.m3ItemCode}'`)
        }
        if (req.itemType !== undefined) {
            query.andWhere(`item_type_id ='${req.itemType}'`)
        }
        if (req.location !== undefined) {
            query.andWhere(`location_id ='${req.location}'`)
        }
        if (req.plant !== undefined) {
            query.andWhere(`plant_id ='${req.plant}'`)
        }
      

        return await query.getRawMany();

    }


}