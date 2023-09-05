export class OperationsInfoRequest{
    operationGroupName:string;
    operationGroupId:number;
    operationName:string;
    operationId:number;
    sequence:number;

    constructor(operationGroupName:string,operationGroupId:number,operationName:string,operationId:number,sequence:number){
        this.operationGroupName = operationGroupName;
        this.operationGroupId = operationGroupId;
        this.operationName = operationName;
        this.operationId = operationId;
        this.sequence = sequence;
    }
}