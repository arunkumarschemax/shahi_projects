import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StockFilterRequest, StocksDto, VendorIdReq } from "@project-management-system/shared-models";
import { PurchaseOrderEntity } from "../entities/purchase-order-entity";
import { FabricType } from "../../fabric-types/fabric-type.entity";
import { UomEntity } from "../../uom/uom-entity";
import { IndentFabricEntity } from "../../indent/indent-fabric-entity";
import { PurchaseOrderFbricEntity } from "../entities/purchase-order-fabric-entity";
import { ProductGroup } from "../../m3-items/product-group-entity";
import { M3ItemsEntity } from "../../m3-items/m3-items.entity";

@Injectable()
export class PurchaseOrderFabricRepository extends Repository<PurchaseOrderFbricEntity> {
    constructor(@InjectRepository(PurchaseOrderFbricEntity) private userRepository: Repository<PurchaseOrderFbricEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getPOFabricData(req:VendorIdReq):Promise<any>{
        const query = await this.createQueryBuilder('pof')
        .select(`m.item_code as itemCode,pof.po_fabric_id AS poFabricId,pof.m3_fabric_code AS m3fabricCode,pof.po_quantity AS poQuantity,pof.quantity_uom_id AS quantityUomId,u.uom,pof.purchase_order_id AS purchaseOrderId,
        pof.fabric_type_id AS fabricTypeId,ft.fabric_type_name AS fabricTypeName,po.po_material_type AS materialType,
        pof.grn_quantity AS grnQuantity,pof.indent_id as indentId, pof.sample_request_id as sampleRequestId,po.po_against AS  poAgainst`)
        .leftJoin(PurchaseOrderEntity,'po','po.purchase_order_id = pof.purchase_order_id')
        .leftJoin(FabricType,'ft','ft.fabric_type_id = pof.fabric_type_id')
        .leftJoin(UomEntity,'u','u.id = pof.quantity_uom_id')
        .leftJoin(M3ItemsEntity,'m','m.m3_items_Id=pof.m3_fabric_code')
        // .leftJoin(IndentFabricEntity,'iff','iff.ifabric_id = pof.indent_fabric_id')
        // .leftJoin(ProductGroup,'pg', 'pg.product_group_id = pof.product_group_id')
        .where(`1=1`)
        if (req.poId !== undefined) {
            query.andWhere(`pof.purchase_order_id = '${req.poId}'`)
        }
        // if (req.materialType !== undefined) {
        //     query.andWhere(`po.po_material_type = '${req.materialType}'`)
        // }
        return query.getRawMany()
    }
}