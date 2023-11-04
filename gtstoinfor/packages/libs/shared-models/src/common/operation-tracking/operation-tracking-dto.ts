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
    issuedUomId:number;
    damagedQuantity:number;
    damagedUomId:number;
    reportedQuantity:number;
    reportedUomId:number;
    rejectedQuantity:number;
    rejectedUomId:number;
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
        issuedUomId:number,
        damagedQuantity:number,
        damagedUomId:number,
        reportedQuantity:number,
        reportedUomId:number,
        rejectedQuantity:number,
        rejectedUomId:number,
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
        this.issuedUomId = issuedUomId
        this.damagedQuantity = damagedQuantity
        this.damagedUomId = damagedUomId
        this.reportedQuantity = reportedQuantity
        this.reportedUomId = reportedUomId
        this.rejectedQuantity = rejectedQuantity
        this.rejectedUomId = rejectedUomId
        this.status = status
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
    

}