import { TrackingEnum } from "../../enum";
import { OperationSequenceModel } from "../operation-sequence";
import { StyleDto } from "../style-management";

export class OperationTrackingDto{
    fabricCode: string
    styleId: number
    requestNo: string
    operationSequenceId: number
    operation:string;
    nextOperation:string;
    issuedQuantity:number;
    issuedUomId:number;
    // damagedQuantity:number;
    // damagedUomId:number;
    reportedQuantity:number;
    reportedUomId:number;
    rejectedQuantity:number;
    rejectedUomId:number;
    status:TrackingEnum;
    physicalQuantity:number
    physicalUom: string
    createdAt?: Date;
    createdUser?: string | null;
    updatedAt?: Date;
    updatedUser?: string | null;
    versionFlag?: number;
    operationTrackingId?:number
    jobNumber?:string;
    operationInventoryId?:number;
    sampleRequestId?:number

    constructor(
        fabricCode: string,
        styleId: number,
        requestNo: string,
        operationSequenceId: number,
        operation:string,
        nextOperation:string,
        issuedQuantity:number,
        issuedUomId:number,
        // damagedQuantity:number,
        // damagedUomId:number,
        reportedQuantity:number,
        reportedUomId:number,
        rejectedQuantity:number,
        rejectedUomId:number,
        status:TrackingEnum,
        physicalQuantity: number,
        physicalUom:string,
        createdAt?: Date,
        createdUser?: string | null,
        updatedAt?: Date,
        updatedUser?: string | null,
        versionFlag?: number,
        operationTrackingId?:number,
        jobNumber?:string,
        operationInventoryId?:number,
        sampleRequestId?:number
    
    ){
        this.fabricCode = fabricCode
        this.operationTrackingId = operationTrackingId
        this.jobNumber = jobNumber
        this.styleId = styleId
        this.requestNo = requestNo
        this.operationSequenceId = operationSequenceId
        this.operationInventoryId = operationInventoryId
        this.operation = operation
        this.nextOperation = nextOperation
        this.issuedQuantity = issuedQuantity
        this.issuedUomId = issuedUomId
        // this.damagedQuantity = damagedQuantity
        // this.damagedUomId = damagedUomId
        this.reportedQuantity = reportedQuantity
        this.reportedUomId = reportedUomId
        this.rejectedQuantity = rejectedQuantity
        this.rejectedUomId = rejectedUomId
        this.status = status
        this.physicalQuantity = physicalQuantity
        this.physicalUom = physicalUom
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.sampleRequestId = sampleRequestId
    }
    

}