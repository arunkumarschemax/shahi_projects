import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IndentFabricEntity } from "../indent-fabric-entity";
import { FabricType } from "../../fabric-types/fabric-type.entity";
import { FabricWeave } from "../../fabric weave/fabric-weave.entity";
import { Colour } from "../../colours/colour.entity"; 7
import { Buyers } from "../../buyers/buyers.entity";
import { FactoriesEntity } from "../../factories/factories.entity";
import { StocksEntity } from "../../stocks/stocks.entity";
import { Indent } from "../indent-entity";
import { UomEntity } from "../../uom/uom-entity";
import { ProfitControlHead } from "../../profit-control-head/profit-control-head-entity";
import { M3ItemsEntity } from "../../m3-items/m3-items.entity";
import { Vendors } from "../../vendors/vendors.entity";
import { Style } from "../../style/dto/style-entity";
import { PurchaseOrderItemsEntity } from "../../purchase-order/entities/purchase-order-items-entity";


@Injectable()
export class FabricIndentRepository extends Repository<IndentFabricEntity> {

    constructor(@InjectRepository(IndentFabricEntity) private IndentFabricEntity: Repository<IndentFabricEntity>
    ) {
        super(IndentFabricEntity.target, IndentFabricEntity.manager, IndentFabricEntity.queryRunner);
    }

    async getFabricIndentData(indentId: number) {
        const query = this.createQueryBuilder(`itf`)
            .select(`"Fabric" as materialType,itf.ifabric_id,itf.indent_id as indentId,
        itf.m3_fabric_code,itf.color,itf.quantity,itf.quantity_unit,
        itf.created_at,itf.updated_at,itf.indent_id,m3.item_code,m3.description,
        co.colour,it.status, uom.uom AS quantityUnit,CONCAT(b.buyer_code,'-',b.buyer_name)AS buyer,s.buyer_id AS buyerId, it.style as styleId,sum(po_quantity) as poQty`)
            .leftJoin(M3ItemsEntity, 'm3', `m3.m3_items_Id = itf.m3_fabric_code`)
            .leftJoin(Colour, 'co', 'co.colour_id=itf.color')
            .leftJoin(Indent, 'it', 'it.indent_id=itf.indent_id')
            .leftJoin(UomEntity, 'uom', 'uom.id=itf.quantity_unit')
            .leftJoin(Style,'s','s.style_id = it.style')
            .leftJoin(Buyers,'b','b.buyer_id = s.buyer_id')
            .leftJoin(PurchaseOrderItemsEntity,'poi',`poi.indent_item_id = itf.ifabric_id and poi.m3_item_id = itf.m3_fabric_code`)
            .where(`itf.indent_id=${indentId} and (itf.quantity-itf.received_quantity) >0`)
            .groupBy(`itf.ifabric_id`)
        const data = await query.getRawMany()
        return data
    }
}