import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationInventory } from "../entity/operation-inventory-entity";
import { OperationInvRequest } from "../dto/operation-inventory-req";
import { Style } from "../../style/dto/style-entity";
import { UomEntity } from "../../uom/uom-entity";

@Injectable()
export class OperationInventoryRepository extends Repository<OperationInventory> {

    constructor(@InjectRepository(OperationInventory) private operationSequence: Repository<OperationInventory>
    ) {
        super(operationSequence.target, operationSequence.manager, operationSequence.queryRunner);
    }

    async getOperationinventory(req:OperationInvRequest){
        console.log(req,'fffffffffffffff')
        const query = this.createQueryBuilder('oi')
        .select(`oi.operation,concat(oi.physical_quantity,'-',u.uom ) as physicalQuantity,concat(oi.issued_quantity,'-',u.uom) as issuedQuantity,oi.damaged_quantity as damagedQuantity,concat(oi.rejected_quantity,'-',u.uom) as rejectedQuantity,oi.issued_uom_id,s.style as style`)
        .leftJoin(Style,'s','s.style_id = oi.style_id')
        .leftJoin(UomEntity,'u','u.id = oi.issued_uom_id')
        .where(`oi.operation_inventory_id = '${req.operationId}'`)
        const data = await query.getRawMany()
        return data
    }
}