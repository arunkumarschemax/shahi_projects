import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FgRmMappingEntity } from "../fg-rm-mapping.entity";
import { FgItemCodeReq } from "@project-management-system/shared-models";
import { RmSkus } from "../../rm-skus/rm-sku.entity";
import { FeatureEntity } from "../../feature-creation/entities/feature.entity";

@Injectable()
export class FgRmMappingRepository extends Repository<FgRmMappingEntity> {

    constructor(@InjectRepository(FgRmMappingEntity) private Repo: Repository<FgRmMappingEntity>
    ) {
        super(Repo.target, Repo.manager, Repo.queryRunner);
    }

    async getAllInfoByItemCode(req:FgItemCodeReq):Promise<any[]>{
        const data = await this.createQueryBuilder('frm')
        .select(`frm.fg_rm_id,frm.fg_item_id,frm.fg_item_code,frm.rm_item_id,frm.rm_item_code,rmsku.item_type,rmsku.rm_sku_code,rmsku.feature_code,fe.feature_name,rmsku.option_group,rmsku.option_value`)
        .leftJoin(RmSkus,'rmsku','rmsku.rm_item_id = frm.rm_item_id')
        .leftJoin(FeatureEntity,'fe','fe.feature_code = rmsku.feature_code')
        .where(`fg_item_code = '${req.fgItemCode}'`)
        return data.getRawMany() 
    }

   
}