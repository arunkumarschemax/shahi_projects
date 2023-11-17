import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FgRmMappingEntity } from "../fg-rm-mapping.entity";
import { FgItemCodeReq } from "@project-management-system/shared-models";
import { RmSkus } from "../../rm-skus/rm-sku.entity";
import { FeatureEntity } from "../../feature-creation/entities/feature.entity";
import { RmMappingFilterRequest } from "@project-management-system/shared-models";
import { ItemCreation } from "../../fg-item/item_creation.entity";
import { ItemTypeEntity } from "../../item-type/item-type.entity";
import { FactoriesEntity } from "../../factories/factories.entity";
import { Operations } from "../../operations/operation.entity";
import { OperationSequence } from "../../operation-sequence/operation-sequence.entity";
import { groupBy } from "rxjs";
import { RmCreationEntity } from "../../rm-items/rm-items.entity";
import { ProductGroup } from "../../product group/product-group-entity";
import { ProcurmentGroup } from "../../procurment group/procurment-group-entity";

@Injectable()
export class FgRmMappingRepository extends Repository<FgRmMappingEntity> {

    constructor(@InjectRepository(FgRmMappingEntity) private Repo: Repository<FgRmMappingEntity>
    ) {
        super(Repo.target, Repo.manager, Repo.queryRunner);
    }

    async getAllInfoByItemCode(req:FgItemCodeReq):Promise<any[]>{
        const data = await this.createQueryBuilder('frm')
        .select(`frm.fg_rm_id,frm.fg_item_id,frm.fg_item_code,frm.rm_item_id,frm.rm_item_code,rmsku.item_type,rmsku.rm_sku_code,rmsku.feature_code,fe.feature_name,rmsku.option_group,rmsku.option_value,rmsku.rm_sku_id,rmi.consumption`)
        .leftJoin(RmSkus,'rmsku','rmsku.rm_item_id = frm.rm_item_id')
        .leftJoin(FeatureEntity,'fe','fe.feature_code = rmsku.feature_code')
        .leftJoin(RmCreationEntity,'rmi','rmi.rm_item_id = frm.rm_item_id')
        .where(`fg_item_code = '${req.fgItemCode}'`)
        return data.getRawMany() 
    }

    async getAllFgRmMapped(req: RmMappingFilterRequest ): Promise<any[]> {
        const query = this.createQueryBuilder('fgm')
        .select(`fgm.rm_item_code AS rm_item_code , item_type,fgi.item_group,fgm.fg_rm_id , fgm.fg_item_code ,fgi.is_sub_contract ,fgi.order_qty ,f.name AS facility ,fgi.season, o.operation_name,os.sequence,pg.product_group AS productGroup ,fgi.item_name ,fgi.style_no ,ri.item_name AS rmItemName , ri.consumption , procurment_group AS rmprocurment_group`) 
      .leftJoin(ItemCreation,'fgi','fgi.fg_item_id = fgm.fg_item_id')
      .leftJoin(ItemTypeEntity,'it','it.item_type_id = fgi.item_type_id')
      .leftJoin(FactoriesEntity,'f','f.id = fgi.facility_id')
      .leftJoin(Operations,'o','o.operation_id = fgm.operation_id')
      .leftJoin(OperationSequence,'os','os.operation_id = o.operation_id')
      .leftJoin(ProductGroup,'pg','pg.product_group_id = fgi.product_group')
      .leftJoin(RmCreationEntity,'ri','ri.rm_item_id = fgm.rm_item_id ')
      .leftJoin(ProcurmentGroup,'pcg','pcg.procurment_group_id = ri.procurement_gorup_id')
      .groupBy(`fgm.fg_rm_id`)

      .where('1=1');
        if (req.fgItemCode !== undefined) {
          query.andWhere(`fg_item_code = :fgCode`, { fgCode: req.fgItemCode }); 
        }
        if (req.rmItemCode !== undefined) {
            query.andWhere(`rm_item_code = :RmCode`, { RmCode: req.rmItemCode }); 
          }
        let data:FgRmMappingEntity[] = await query.getRawMany();
        return data;
      }
}