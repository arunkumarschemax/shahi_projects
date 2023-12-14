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



@Injectable()
export class TrimIndentRepository extends Repository<IndentTrimsEntity> {

    constructor(@InjectRepository(IndentTrimsEntity) private IndentTrimsEntity: Repository<IndentTrimsEntity>
    ) {
        super(IndentTrimsEntity.target, IndentTrimsEntity.manager, IndentTrimsEntity.queryRunner);
    }

    async getTrimIndentData (indentId:number){
        const query = this.createQueryBuilder(`itt`)
        .select (`it.request_no AS indentCode,b.buyer_name as buyerName,itt.trim_type as materialType,mt.trim_code as m3TrimCode,itt.itrims_id,itt.trim_type,itt.trim_code,itt.quantity,itt.indent_id as indentId,itt.quantity_unit AS quantityUnitId,u.uom AS quantityUnit,
        itt.created_at,itt.updated_at,itt.indent_id,itt.remarks,it.status,CONCAT(b.buyer_code,'-',b.buyer_name)AS buyer,s.buyer_id AS buyerId, it.style as styleId`)
        .leftJoin(Indent,'it','it.indent_id=itt.indent_id')
        .leftJoin(Style,'s','s.style_id = it.style')
        .leftJoin(Buyers,'b','b.buyer_id = s.buyer_id')
        .leftJoin(M3TrimsEntity,'mt','itt.trim_code=mt.m3_trim_Id')
        .leftJoin(UomEntity,'u','itt.quantity_unit=u.id')
        .where(`itt.indent_id=${indentId} and (itt.quantity-itt.received_quantity) >0`)
        const data = await query.getRawMany()
        console.log(data)
        return data 
    }
}