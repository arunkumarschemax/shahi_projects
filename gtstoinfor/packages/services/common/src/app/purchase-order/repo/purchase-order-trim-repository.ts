import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StockFilterRequest, StocksDto, VendorIdReq } from "@project-management-system/shared-models";
import { PurchaseOrderEntity } from "../entities/purchase-order-entity";
import { FabricType } from "../../fabric-types/fabric-type.entity";
import { UomEntity } from "../../uom/uom-entity";
import { IndentFabricEntity } from "../../indent/indent-fabric-entity";
import { PurchaseOrderTrimEntity } from "../entities/purchase-order-trim-entity";
import { IndentTrimsEntity } from "../../indent/indent-trims-entity";

@Injectable()
export class PurchaseOrderTrimRepository extends Repository<PurchaseOrderTrimEntity> {
    constructor(@InjectRepository(PurchaseOrderTrimEntity) private userRepository: Repository<PurchaseOrderTrimEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getPOTrimData(req:VendorIdReq):Promise<any>{
        const query = await this.createQueryBuilder('pot')
        .select(`pot.po_trim_id AS poTrimId,pot.trim_id AS trimId, pot.m3_trim_code AS m3TrimCode,pot.purchase_order_id AS poId, pot.po_quantity AS poQuantity,
        pot.quantity_uom_id AS quantityUomId,u.uom,it.itrims_id AS indentTrimId,po.po_material_type AS materialType,pot.grn_quantity AS grnQuantity`)
        .leftJoin(PurchaseOrderEntity,'po','po.purchase_order_id = pot.purchase_order_id')
        .leftJoin(UomEntity,'u','u.id = pot.quantity_uom_id')
        .leftJoin(IndentTrimsEntity,'it','it.itrims_id = pot.indent_trim_id')
        .where(`1=1`)
        if (req.poId !== undefined) {
            query.andWhere(`pot.purchase_order_id = '${req.poId}'`)
        }
        // if (req.materialType !== undefined) {
        //     query.andWhere(`po.po_material_type = '${req.materialType}'`)
        // }
        return query.getRawMany()
    }
}