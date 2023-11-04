import { OperationSequenceModel } from "../operation-sequence";
import { StyleDto } from "../style-management";

export class OperationInventoryDto{
    operationInventoryId:number;
    styleId: number
    operationSequenceId: number
    operation:string;
    physicalQuantity:number;
    physicalUomId:number;
    issuedQuantity:number;
    issuedUomId:number;
    damagedQuantity:number;
    damagedUomId:number;
    rejectedQuantity:number;
    rejectedUomId:number;
    createdAt: Date;
    createdUser: string | null;
    updatedAt: Date;
    updatedUser: string | null;
    versionFlag: number;

    constructor(
        operationInventoryId:number,
        styleId: number,
        operationSequenceId: number,
        operation:string,
        physicalQuantity:number,
        physicalUomId:number,
        issuedQuantity:number,
        issuedUomId:number,
        damagedQuantity:number,
        damagedUomId:number,
        rejectedQuantity:number,
        rejectedUomId:number,
        createdAt: Date,
        createdUser: string | null,
        updatedAt: Date,
        updatedUser: string | null,
        versionFlag: number
    ){
        this.operationInventoryId = operationInventoryId
        this.styleId = styleId
        this.operationSequenceId = operationSequenceId
        this.operation = operation
        this.physicalQuantity = physicalQuantity
        this.physicalUomId = physicalUomId
        this.issuedQuantity = issuedQuantity
        this.issuedUomId = issuedUomId
        this.damagedQuantity = damagedQuantity
        this.damagedUomId = damagedUomId
        this.rejectedQuantity = rejectedQuantity
        this.rejectedUomId = rejectedUomId
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}