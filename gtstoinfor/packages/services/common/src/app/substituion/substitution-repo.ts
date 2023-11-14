import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Substitution } from "./substituion.entity";
import { FgItemBom } from "./fg-item-bom.entity";
import { SubstituionModel, fgItemIdReq } from "@project-management-system/shared-models";
import { RmSkus } from "../rm-skus/rm-sku.entity";

@Injectable()
export class SubstitutionRepository extends Repository<Substitution> {   

    constructor(@InjectRepository(Substitution) private substitutionRepo: Repository<Substitution>
    ) {
        super(substitutionRepo.target, substitutionRepo.manager, substitutionRepo.queryRunner);
    }


   async getSubstitution(req?:fgItemIdReq):Promise<any>{
    console.log(req,'pppppppppppp');
    
    const query= await this.createQueryBuilder('sub')
    .select('sub.substituion_id as substituionId ,sub.fg_item_code as fgItemCode, sub.rm_item_code as rmItemCode , sub.fg_item_id as fgItemId, sub.rm_item_id as rmItemId, sub.fg_sku as fgSku, sub.fg_sku_id as fgSkuId, sub.rm_sku_id as rmSkuId,Fg.fg_item_bom_id as fgItemBomId , Fg.fg_sku_id as fgSkuId, Fg.fg_sku as fgSku,Fg.rm_item_id as rmItemId, Fg.rm_item_code as rmItemCode,Fg.rm_sku_id as rmSkuId,Fg.rm_sku as rmSku,Fg.consumption as consumption, Fg.item_type_id as itemTypeId, Fg.item_group_id as itemGroupeId, Fg.status as status, rm.rm_item_id as rmItemId ,rm.item_type as itemType, rm.rm_sku_code as rmSkuCode,rm.feature_code as featureCode , rm.status as status,rm.item_code as itemCode,rm.feature_option_id as featureOptionId, rm.option_group as optionGroup , rm.option_id as optionId, rm.option_value as optionValue ')
    .leftJoin(FgItemBom,'Fg', 'Fg.rm_item_id= sub.rm_item_id')
    .leftJoin(RmSkus,'rm','rm.rm_item_id=sub.rm_item_id')
    .where('1=1');
    if(req.fgItemCode !== undefined){
        query.andWhere(`fg_item_code= :fgItemCode`,{fgItemCode:req.fgItemCode})
    }
    if(req.rmItemCode !== undefined){
        query.andWhere(`rm_item_code =:rmItemCode `,{rmItemCode:req.rmItemCode})
    }
    // .where(`Fg.fg_item_code='${req.fgItemCode}'`)

    return query.getRawMany();
   } 
   
   async getFgSku(req:fgItemIdReq):Promise<any>{
    const query = await this.createQueryBuilder()
    .select('fg_item_code,fg_item_id')
    .groupBy('fg_item_code')
    return await query.getRawMany()
   }

   async getRmSku(req:fgItemIdReq):Promise<any>{
    const query = await this.createQueryBuilder()
    .select('rm_item_code,rm_item_id')
    .groupBy('rm_item_code')
    // .leftJoin(RmSkus,'rm','rm.rm_item_id=sub.rm_item_id')
    return await query.getRawMany()
   }
}
