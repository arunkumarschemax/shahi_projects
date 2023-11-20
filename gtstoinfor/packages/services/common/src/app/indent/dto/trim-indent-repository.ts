import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IndentTrimsEntity } from "../indent-trims-entity";
import { Size } from "../../sizes/sizes-entity";
import { Colour } from "../../colours/colour.entity";
import { Indent } from "../indent-entity";
import { StocksEntity } from "../../stocks/stocks.entity";



@Injectable()
export class TrimIndentRepository extends Repository<IndentTrimsEntity> {

    constructor(@InjectRepository(IndentTrimsEntity) private IndentTrimsEntity: Repository<IndentTrimsEntity>
    ) {
        super(IndentTrimsEntity.target, IndentTrimsEntity.manager, IndentTrimsEntity.queryRunner);
    }

    async getTrimIndentData (indentId:number){
        const query = this.createQueryBuilder(`itt`)
        .select (`"Trim" as materialType,itt.indent_id as indentId,itt.itrims_id,itt.trim_type,itt.trim_code,itt.size,itt.color,itt.quantity,itt.quantity_unit,itt.m3_trim_code,itt.description,
        itt.created_at,itt.updated_at,itt.indent_id,itt.remarks,co.colour,si.sizes,it.status,ss.quantity`)
        .leftJoin(Size,'si','si.size_id=itt.size')
        .leftJoin(Colour,'co','co.colour_id=itt.color')
        .leftJoin(Indent,'it','it.indent_id=itt.indent_id')
        .leftJoin(StocksEntity,'ss','ss.item_type_id=itt.trim_type')
        .where(`itt.indent_id=${indentId}`)
        const data = await query.getRawMany()
        console.log(data)
        return data 
    }
}