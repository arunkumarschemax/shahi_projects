import { TrackingEnum } from "../../enum";
import { OperationSequenceModel } from "../operation-sequence";
import { StyleDto } from "../style-management";

export class OperationTrackingDto{
    operationTrackingId:number
    jobNumber:string;
    styleId: number
    operationSequenceId: number
    operationInventoryId:number;
    operation:string;
    nextOperation:string;
    issuedQuantity:number;
    issuedUom:string;
    damagedQuantity:number;
    damagedUom:string;
    reportedQuantity:number;
    reportedUom:string;
    rejectedQuantity:number;
    rejectedUom:string;
    status:TrackingEnum;
    createdAt: Date;
    createdUser: string | null;
    updatedAt: Date;
    updatedUser: string | null;
    versionFlag: number;

    constructor(
        operationTrackingId:number,
        jobNumber:string,
        styleId: number,
        operationSequenceId: number,
        operationInventoryId:number,
        operation:string,
        nextOperation:string,
        issuedQuantity:number,
        issuedUom:string,
        damagedQuantity:number,
        damagedUom:string,
        reportedQuantity:number,
        reportedUom:string,
        rejectedQuantity:number,
        rejectedUom:string,
        status:TrackingEnum,
        createdAt: Date,
        createdUser: string | null,
        updatedAt: Date,
        updatedUser: string | null,
        versionFlag: number,
    
    ){
        this.operationTrackingId = operationTrackingId
        this.jobNumber = jobNumber
        this.styleId = styleId
        this.operationSequenceId = operationSequenceId
        this.operationInventoryId = operationInventoryId
        this.operation = operation
        this.nextOperation = nextOperation
        this.issuedQuantity = issuedQuantity
        this.issuedUom = issuedUom
        this.damagedQuantity = damagedQuantity
        this.damagedUom = damagedUom
        this.reportedQuantity = reportedQuantity
        this.reportedUom = reportedUom
        this.rejectedQuantity = rejectedQuantity
        this.rejectedUom = rejectedUom
        this.status = status
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
    

}