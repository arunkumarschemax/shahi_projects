import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoBom } from "../co-bom.entity";
import { FgItemBom } from "../../substituion/fg-item-bom.entity";
import { RmSkus } from "../../rm-skus/rm-sku.entity";
import { ItemSkus } from "../../sku-generation/sku-generation.entity";
import { StyleOrderId } from "../../style-order/style-order-id.request";


@Injectable()
export class CoBomRepository extends Repository<CoBom>{
    constructor(@InjectRepository(CoBom) private CoRepo: Repository<CoBom>
    ) {
        super(CoRepo.target, CoRepo.manager, CoRepo.queryRunner);
    }


    async getBomAgainstItem(req?:StyleOrderId):Promise<any>{
        const query = await this.createQueryBuilder('i')
        .select('i.id,i.quantity,i.coNumber,i.coLineNumber,i.fgSku,i.co_id,Fg.fgItemBomId,Fg.fgSkuId,Fg.rmItemCode,Fg.rmSkuId,Fg.consumption,Fg.itemTypeId.Fg.itemGroupeId,Fg.itemType,Fg.rm_item_id')
        .leftJoin(FgItemBom,'Fg','Fg.fgItemBomId= i.fgItemBomId')
        if (req?.styleOrderId !== undefined) {
            query.andWhere(`co_id ='${req.styleOrderId}'`)
        }
        return query.getRawMany()
    }
 

    async getDataForMOPByCoNumber(req?:StyleOrderId):Promise<any>{
        const query = await this.createQueryBuilder('cobom')
        .select(`cobom.co_number ,cobom.co_line_number,cobom.fg_sku,cobom.co_id,
        fgitbo.fg_sku_id,fgitbo.rm_item_code,fgitbo.rm_sku_id,fgitbo.consumption,fgitbo.item_type_id,fgitbo.item_group_id,fgitbo.item_type,fgitbo.rm_item_id,
        rmsku.rm_item_id,rmsku.item_type,rmsku.rm_sku_code,rmsku.feature_code,rmsku.status,rmsku.feature_option_id,rmsku.option_group,rmsku.option_id,rmsku.option_value,
        itsku.sku_code,itsku.status,itsku.po_number,itsku.po_line_number,itsku.item_code,itsku.size,itsku.color,itsku.destination`)
        .leftJoin(FgItemBom,'fgitbo','fgitbo.fgItemBomId= cobom.fgItemBomId')
        .leftJoin(RmSkus,'rmsku','rmsku.rm_sku_id = fgitbo.rm_sku_id')
        .leftJoin(ItemSkus,'itsku','itsku.item_sku_id = fgitbo.fg_sku_id')
        

        if (req?.styleOrderId !== undefined) {
            query.andWhere(`co_id ='${req.styleOrderId}'`)
        }


        return query.getRawMany()
    }
}