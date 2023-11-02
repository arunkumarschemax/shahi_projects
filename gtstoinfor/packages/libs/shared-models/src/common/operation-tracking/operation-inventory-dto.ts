import { OperationSequenceModel } from "../operation-sequence";
import { StyleDto } from "../style-management";

export class OperationInventory{
    operationIssuingId:number;
    style: StyleDto[]
    operationSequence: OperationSequenceModel[]
    operation:string;
    physicalQuantity:number;
    physicalUom:string;
    issuedQuantity:number;
    issuedUom:string;
    damagedQuantity:number;
    damagedUom:string;
    rejectedQuantity:number;
    rejectedUom:string;
    createdAt: Date;
    createdUser: string | null;
    updatedAt: Date;
    updatedUser: string | null;
    versionFlag: number;

    constructor(
        operationIssuingId:number,
        style: StyleDto[],
        operationSequence: OperationSequenceModel[],
        operation:string,
        physicalQuantity:number,
        physicalUom:string,
        issuedQuantity:number,
        issuedUom:string,
        damagedQuantity:number,
        damagedUom:string,
        rejectedQuantity:number,
        rejectedUom:string,
        createdAt: Date,
        createdUser: string | null,
        updatedAt: Date,
        updatedUser: string | null,
        versionFlag: number
    ){
        this.operationIssuingId = operationIssuingId
        this.style = style
        this.operationSequence = operationSequence
        this.style = style
        this.operation = operation
        this.physicalQuantity = physicalQuantity
        this.physicalUom = physicalUom
        this.issuedQuantity = issuedQuantity
        this.issuedUom = issuedUom
        this.damagedQuantity = damagedQuantity
        this.damagedUom = damagedUom
        this.rejectedQuantity = rejectedQuantity
        this.rejectedUom = rejectedUom
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}