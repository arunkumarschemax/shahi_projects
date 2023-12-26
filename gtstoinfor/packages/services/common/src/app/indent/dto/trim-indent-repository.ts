import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IndentTrimsEntity } from "../indent-trims-entity";
import { Size } from "../../sizes/sizes-entity";
import { Colour } from "../../colours/colour.entity";
import { Indent } from "../indent-entity";
import { StocksEntity } from "../../stocks/stocks.entity";
import { ProductGroup } from "../../m3-items/product-group-entity";
import { RmCreationEntity } from "../../m3-items/rm-items.entity";
import { UomEntity } from "../../uom/uom-entity";
import { Buyers } from "../../buyers/buyers.entity";
import { Style } from "../../style/dto/style-entity";
import { M3TrimsEntity } from "../../m3-trims/m3-trims.entity";
import { PurchaseOrderItemsEntity } from "../../purchase-order/entities/purchase-order-items-entity";
import { ItemTypeEnum } from "@project-management-system/shared-models";
import { TrimParamsMapping } from "../../trim-params-mapping/trim-params-mapping.entity";



@Injectable()
export class TrimIndentRepository extends Repository<IndentTrimsEntity> {

    constructor(@InjectRepository(IndentTrimsEntity) private IndentTrimsEntity: Repository<IndentTrimsEntity>
    ) {
        super(IndentTrimsEntity.target, IndentTrimsEntity.manager, IndentTrimsEntity.queryRunner);
    }

    async getTrimIndentData (indentId:number){
        const query = this.createQueryBuilder(`itt`)
        .select (`it.request_no AS indentCode,b.buyer_name as buyerName,itt.trim_type as materialType,mt.description AS description,mt.trim_code as m3TrimCode,itt.itrims_id,itt.trim_type,itt.trim_code,itt.quantity,itt.indent_id as indentId,itt.quantity_unit AS quantityUnitId,u.uom AS quantityUnit,
        itt.created_at,itt.updated_at,itt.indent_id,itt.remarks,it.status,CONCAT(b.buyer_code,'-',b.buyer_name)AS buyer,s.buyer_id AS buyerId, it.style as styleId,IF(sum(poi.po_quantity) IS null,0,sum(poi.po_quantity)) as poQty,IF(sum(po_quantity) IS null, 0,sum(po_quantity)) as poQuantity,tpm.*,(itt.quantity - IF(sum(poi.po_quantity) IS null,0,sum(poi.po_quantity))) AS toBeProcured`)
        .leftJoin(Indent,'it','it.indent_id=itt.indent_id')
        .leftJoin(Style,'s','s.style_id = it.style')
        .leftJoin(Buyers,'b','b.buyer_id = s.buyer_id')
        .leftJoin(M3TrimsEntity,'mt','itt.trim_code=mt.m3_trim_Id')
        .leftJoin(UomEntity,'u','itt.quantity_unit=u.id')
        .leftJoin(TrimParamsMapping,'tpm','tpm.trim_mapping_id=mt.trim_mapping_id')
        .leftJoin(PurchaseOrderItemsEntity,'poi',`poi.indent_item_id = itt.itrims_id and poi.m3_item_id = itt.trim_code and poi.item_type != '${ItemTypeEnum.FABRIC}'`)
        .where(`itt.indent_id=${indentId}`)
        .groupBy(`itt.itrims_id`)
        const data = await query.getRawMany()
        console.log(data)
        return data 
    }
}

