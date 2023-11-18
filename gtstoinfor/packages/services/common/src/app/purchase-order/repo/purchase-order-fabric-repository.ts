import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StockFilterRequest, StocksDto, VendorIdReq } from "@project-management-system/shared-models";
import { PurchaseOrderEntity } from "../entities/purchase-order-entity";
import { FabricType } from "../../fabric-types/fabric-type.entity";
import { UomEntity } from "../../uom/uom-entity";
import { IndentFabricEntity } from "../../indent/indent-fabric-entity";
import { PurchaseOrderFbricEntity } from "../entities/purchase-order-fabric-entity";

@Injectable()
export class PurchaseOrderFabricRepository extends Repository<PurchaseOrderFbricEntity> {
    constructor(@InjectRepository(PurchaseOrderFbricEntity) private userRepository: Repository<PurchaseOrderFbricEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getPOFabricData(req:VendorIdReq):Promise<any>{
        const query = await this.createQueryBuilder('pof')
        .select(`pof.po_fabric_id AS poFabricId,pof.m3_fabric_code AS m3fabricCode,pof.po_quantity AS poQuantity,pof.quantity_uom_id AS quantityUomId,u.uom,pof.purchase_order_id AS purchaseOrderId,
        pof.fabric_type_id AS fabricTypeId,ft.fabric_type_name AS fabricTypeName,iff.ifabric_id AS indentFabricId,po.po_material_type AS materialType`)
        .leftJoin(PurchaseOrderEntity,'po','po.purchase_order_id = pof.purchase_order_id')
        .leftJoin(FabricType,'ft','ft.fabric_type_id = pof.fabric_type_id')
        .leftJoin(UomEntity,'u','u.id = pof.quantity_uom_id')
        .leftJoin(IndentFabricEntity,'iff','iff.ifabric_id = pof.indent_fabric_id')
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