import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationInventory } from "../entity/operation-inventory-entity";
import { OperationInvRequest } from "../dto/operation-inventory-req";
import { Style } from "../../style/dto/style-entity";

@Injectable()
export class OperationInventoryRepository extends Repository<OperationInventory> {

    constructor(@InjectRepository(OperationInventory) private operationSequence: Repository<OperationInventory>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }

    async getOperationinventory(req:OperationInvRequest){
        console.log(req,'fffffffffffffff')
        const query = this.createQueryBuilder('oi')
        .select(`oi.operation,oi.physical_quantity as physicalQuantity,oi.physical_uom as physicalUom,oi.issued_quantity as issuedQuantity,oi.issued_uom as issuedUom,oi.damaged_quantity as damagedQuantity,oi.damaged_uom as damagedUom,oi.rejected_quantity as rejectedQuantity,oi.rejected_uom as rejectedUom,s.style as style`)
        .leftJoin(Style,'s','s.style_id = oi.style_id')
        .where(`oi.operation_inventory_id = '${req.operationId}'`)
        const data = await query.getRawMany()
        return data
    }
}