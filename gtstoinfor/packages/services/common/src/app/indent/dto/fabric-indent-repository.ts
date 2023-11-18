import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IndentFabricEntity } from "../indent-fabric-entity";
import { FabricType } from "../../fabric-types/fabric-type.entity";
import { FabricWeave } from "../../fabric weave/fabric-weave.entity";
import { Colour } from "../../colours/colour.entity";7
import { Buyers } from "../../buyers/buyers.entity";
import { FactoriesEntity } from "../../factories/factories.entity";
import { StocksEntity } from "../../stocks/stocks.entity";
import { Indent } from "../indent-entity";
import { UomEntity } from "../../uom/uom-entity";
import { ProfitControlHead } from "../../profit-control-head/profit-control-head-entity";


@Injectable()
export class FabricIndentRepository extends Repository<IndentFabricEntity> {

    constructor(@InjectRepository(IndentFabricEntity) private IndentFabricEntity: Repository<IndentFabricEntity>
    ) {
        super(IndentFabricEntity.target, IndentFabricEntity.manager, IndentFabricEntity.queryRunner);
    }

    async getFabricIndentData (indentId:number){
        const query = this.createQueryBuilder(`itf`)
        .select (`itf.ifabric_id,itf.content,itf.fabric_type,itf.weave_id,itf.weight,itf.width,itf.yarn_count,itf.yarn_unit,itf.construction,
        itf.finish,itf.shrinkage,itf.m3_fabric_code,itf.color,itf.pch,itf.moq,itf.moq_unit,itf.moq_price,
        itf.moq_price_unit,itf.season,itf.supplier_id,itf.buyer_id,itf.grn_date,itf.xl_no,itf.quantity,itf.quantity_unit,
        itf.created_at,itf.updated_at,itf.indent_id,itf.weight_unit,fti.fabric_type_name,fw.fabric_weave_name,
        co.colour,bu.buyer_name,ss.quantity,it.status, uom.uom AS quantityUnit,uom1.uom AS unit, uom2.uom AS weightUnit,uom3.uom AS moqUnit, uom4.uom AS moqPriceUnit, pch.profit_control_head `)
        .leftJoin(FabricType,'fti','fti.fabric_type_id=itf.fabric_type')
        .leftJoin(FabricWeave,'fw','fw.fabric_weave_id=itf.weave_id')
        .leftJoin(Colour,'co','co.colour_id=itf.color')
        .leftJoin(Buyers,'bu','bu.buyer_id=itf.buyer_id')
        .leftJoin(StocksEntity,'ss','ss.item_type_id=itf.fabric_type')
        .leftJoin(Indent,'it','it.indent_id=itf.indent_id')
        .leftJoin(UomEntity,'uom','uom.id=itf.quantity_unit')
        .leftJoin(UomEntity,'uom1','uom1.id=itf.yarn_unit')
        .leftJoin(UomEntity,'uom2','uom2.id=itf.weight_unit')
        .leftJoin(UomEntity,'uom3','uom3.id=itf.moq_unit')
        .leftJoin(UomEntity,'uom4','uom4.id=itf.moq_price_unit')
        .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id=itf.pch')
        .where(`itf.indent_id=${indentId}`)
        const data = await query.getRawMany()
        return data 
    }
}