import { SaveOrderDto } from "../models/save-order-dto";
import { OrdersChildEntity } from "../entities/orders-child.entity";
import { OrdersEntity } from "../entities/orders.entity";
import { TrimOrderDto } from "../models/trim-order.dto";
import { TrimOrdersChildEntity } from "../entities/trim-orders-child.entity";

export class TrimOrdersChildAdapter {

    public convertDtoToEntity(dto: TrimOrderDto , id :number, month:number): TrimOrdersChildEntity{
        const entity = new TrimOrdersChildEntity()
        console.log(dto,'ooopdto')
        entity.year = dto.year
        entity.orderNo = dto.orderNo
        entity.revisionNo =dto.revisionNo
        entity.planningSsn =dto.planningSsn
        entity.globalBusinessUnit =dto.globalBusinessUnit
        entity.businessUnit =dto.businessUnit
        entity.itemBrand =dto.itemBrand
        entity.Department =dto.Department
        entity.revisedDate =dto.revisedDate
        entity.DocumentStatus =dto.DocumentStatus
        entity.answeredStatus =dto.answeredStatus
        entity.vendorPersoninCharge =dto.vendorPersoninCharge
        entity.decisionDate =dto.decisionDate
        entity.paymentTerms =dto.paymentTerms
        entity.contractedETD =dto.contractedETD
        entity.ETAWH =dto.ETAWH
        entity.approver =dto.approver
        entity.approvalDate =dto.approvalDate
        entity.orderConditions =dto.orderConditions
        entity.remark =dto.remark
        entity.rawMaterialCode =dto.rawMaterialCode
        entity.supplierRawMaterialCode =dto.supplierRawMaterialCode
        entity.supplierRawMaterial =dto.supplierRawMaterial
        entity.vendorCode =dto.vendorCode
        entity.vendor =dto.vendor
        entity.managementFactoryCode =dto.managementFactoryCode
        entity.managementFactory =dto.managementFactory
        entity.branchFactoryCode =dto.branchFactoryCode
        entity.branchFactory =dto.branchFactory
        entity.orderPlanNumber =dto.orderPlanNumber
        entity.itemCode =dto.itemCode
        entity.item =dto.item
        entity.representativeSampleCode =dto.representativeSampleCode
        entity.sampleCode =dto.sampleCode
        entity.colorCode =dto.colorCode
        entity.color =dto.color
        entity.patternDimensionCode =dto.patternDimensionCode
        entity.sizeCode =dto.sizeCode
        entity.size =dto.size
        entity.orderQtyPcs =dto.orderQtyPcs
        entity.arrangementBy =dto.arrangementBy
        entity.trimDescription =dto.trimDescription
        entity.trimItemNo =dto.trimItemNo
        entity.trimSupplier =dto.trimSupplier
        entity.createdUser =dto.createdUser
        // entity.updatedUser =dto.updatedUser
        // entity.createdAt =dto.createdAt
        // entity.updatedAt =dto.updatedAt
        entity.version =dto.version
        entity.fileId =id;
        entity.month =month
        return entity
    }
}