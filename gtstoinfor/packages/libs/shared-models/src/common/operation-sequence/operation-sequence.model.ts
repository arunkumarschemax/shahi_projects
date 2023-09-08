import { OperationsInfoRequest } from "./operations-info-request";

export class OperationSequenceModel{
    operationSequenceId:number;
    itemCode:string;
    itemId:number;
    operatrionsInfo : OperationsInfoRequest[];

    constructor(operationSequenceId:number,itemCode:string,itemId:number,operatrionsInfo : OperationsInfoRequest[],){
        this.operationSequenceId = operationSequenceId;
        this.itemCode = itemCode;
        this.itemId = itemId;
        this.operatrionsInfo = operatrionsInfo;
    
}
}