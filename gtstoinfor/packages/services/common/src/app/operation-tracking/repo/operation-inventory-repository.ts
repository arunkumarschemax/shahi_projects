import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationInventory } from "../entity/operation-inventory-entity";
import { OperationInvRequest } from "../dto/operation-inventory-req";
import { Style } from "../../style/dto/style-entity";
import { UomEntity } from "../../uom/uom-entity";
import { OperationTracking } from "../entity/operation-tracking-entity";
import { TabNameReq } from "@project-management-system/shared-models";
import { MaterialIssueEntity } from "../../material-issue/entity/material-issue-entity";
import { MaterialFabricEntity } from "../../material-issue/entity/material-fabric-entity";

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


    async getOperationInventoryData(req: TabNameReq):Promise<any>{
        const query = this.createQueryBuilder('oi')
        .select(`oi.operation, oi.next_operation as nextOperation, oi.issued_quantity as quantity,oi.issued_uom_id AS issuedUomId,oi.operation_inventory_id,oi.style_id,ot.status,ot.reported_quantity as issuedQuantity,u.uom as issuedUom,mi.consumption_code as consumptionCode, mi.request_no as requestNo,mf.fabric_code as fabricCode`)
        .leftJoin(OperationTracking,'ot','ot.operation_inventory_id = oi.operation_inventory_id')
        .leftJoin(MaterialIssueEntity,'mi','mi.style_id = oi.style_id')
        .leftJoin(MaterialFabricEntity,'mf','mf.material_issue_id = mi.material_issue_id')
        .leftJoin(UomEntity,'u','u.id = ot.reported_uom_id')
        .where(`oi.next_operation = '${req.tabName}' and oi.style_id = '${req.styleId}' and reported_status='COMPLETED'`)
        .groupBy(`oi.operation_inventory_id`)
        const data = await query.getRawMany()
        return data
    }
}