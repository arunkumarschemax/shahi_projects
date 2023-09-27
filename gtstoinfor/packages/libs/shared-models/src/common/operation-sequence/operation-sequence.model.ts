import { OperationsInfoRequest } from "./operations-info-request";

export class OperationSequenceModel{
    operationSequenceId:number;
    style:string;
    styleId:number;
    styleDescription: string;
    operatrionsInfo : OperationsInfoRequest[];

    constructor(operationSequenceId:number,style:string,styleId:number,styleDescription: string,operatrionsInfo : OperationsInfoRequest[],){
        this.operationSequenceId = operationSequenceId;
        this.style = style;
        this.styleId = styleId;
        this.styleDescription = styleDescription;
        this.operatrionsInfo = operatrionsInfo;
    
}
}