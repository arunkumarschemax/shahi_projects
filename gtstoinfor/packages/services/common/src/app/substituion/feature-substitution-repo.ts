import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FeatureSubstitution } from "./feature-substituion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { fgItemIdReq } from "@project-management-system/shared-models";

@Injectable()
export class FeatureSubstitutionRepository extends Repository<FeatureSubstitution> {   

    constructor(@InjectRepository(FeatureSubstitution) private FeatureSubstitutionRepo: Repository<FeatureSubstitution>
    ) {
        super(FeatureSubstitutionRepo.target, FeatureSubstitutionRepo.manager, FeatureSubstitutionRepo.queryRunner);
    }

    async getRmSkuInfo(req:fgItemIdReq):Promise<any[]>{
        const data = await this.createQueryBuilder('fs')
        .select(`fs.fg_item_id,fs.fg_item_code,fs.rm_item_id,fs.rm_item_code,fs.rm_sku_code,fs.feature_code,fs.feature_id,fs.fg_option,fs.fg_option_value,fs.rm_option,fs.rm_optoin_value`)
        .where(`fs.fg_item_code = ${req.fgItemCode}`)
        return data.getRawMany()
    }
}