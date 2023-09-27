import { OperationsInfoRequest } from "./operations-info-request";

export class OperationSequenceRequest{
    style:string;
    styleId:number;
    operatrionsInfo : OperationsInfoRequest[];
    createdUser:string;
    updatedUser?:string;
    operationSequenceId?:number;

    constructor(style:string,styleId:number,operatrionsInfo : OperationsInfoRequest[],createdUser:string,updatedUser?:string,operationSequenceId?:number){
        this.style = style;
        this.styleId = styleId;
        this.operatrionsInfo = operatrionsInfo;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.operationSequenceId = operationSequenceId;

    }



}