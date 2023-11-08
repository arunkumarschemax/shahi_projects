import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RmSkus } from "./rm-sku.entity";

@Injectable()
export class RmSKusRepository extends Repository<RmSkus> {

    constructor(@InjectRepository(RmSkus) private rmSkus: Repository<RmSkus>
    ) {
        super(rmSkus.target, rmSkus.manager, rmSkus.queryRunner);
    }


    async getSKUCodeData(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`rm_sku_code as skuCode`)
            .groupBy(`rm_sku_code`)
        return query.getRawMany()
    }

    async getFeatureCodeData(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`feature_code as featureCode`)
            .groupBy(`feature_code`)
        return query.getRawMany()
    }

    async getItemCodeData(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`item_code as itemCode`)
            .groupBy(`item_code`)
        return query.getRawMany()
    }

    async getOptionValueData(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`option_value as optionValue`)
            .groupBy(`option_value`)
        return query.getRawMany()
    }
}