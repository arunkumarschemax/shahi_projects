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



@Injectable()
export class TrimIndentRepository extends Repository<IndentTrimsEntity> {

    constructor(@InjectRepository(IndentTrimsEntity) private IndentTrimsEntity: Repository<IndentTrimsEntity>
    ) {
        super(IndentTrimsEntity.target, IndentTrimsEntity.manager, IndentTrimsEntity.queryRunner);
    }

    async getTrimIndentData (indentId:number){
        const query = this.createQueryBuilder(`itt`)
        .select (`itt.itrims_id,itt.trim_type,itt.trim_code,itt.quantity,
        itt.created_at,itt.updated_at,itt.indent_id,itt.remarks,it.status,ss.quantity,CONCAT(b.buyer_code,'-',b.buyer_name)AS buyer,s.buyer_id AS buyerId`)
        // .leftJoin(Size,'si','si.size_id=itt.size')
        // .leftJoin(Colour,'co','co.colour_id=itt.color')
        .leftJoin(Indent,'it','it.indent_id=itt.indent_id')
        .leftJoin(StocksEntity,'ss','ss.m3_item=itt.trim_code')
        .leftJoin(Style,'s','s.style_id = it.style')
        .leftJoin(Buyers,'b','b.buyer_id = s.buyer_id')
        // .leftJoin(ProductGroup,'pg','pg.product_group_id=itt.trim_type')
        // .leftJoin(RmCreationEntity,'rm','rm.rm_item_id=itt.trim_code')
        // .leftJoin(UomEntity, 'uom', 'uom.id=itt.quantity_unit')
        .where(`itt.indent_id=${indentId}`)
        const data = await query.getRawMany()
        console.log(data)
        return data 
    }
}