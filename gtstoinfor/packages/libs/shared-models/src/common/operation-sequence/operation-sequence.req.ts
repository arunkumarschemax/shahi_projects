import { OperationsInfoRequest } from "./operations-info-request";

export class OperationSequenceRequest{
    itemCode:string;
    itemId:number;
    operatrionsInfo : OperationsInfoRequest[];
    createdUser:string;
    updatedUser?:string;
    operationSequenceId?:number;

    constructor(itemCode:string,itemId:number,operatrionsInfo : OperationsInfoRequest[],createdUser:string,updatedUser?:string,operationSequenceId?:number){
        this.itemCode = itemCode;
        this.itemId = itemId;
        this.operatrionsInfo = operatrionsInfo;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.operationSequenceId = operationSequenceId;

    }



}