
export class OperationFilterModel{
    itemsId?:number;
    operationName?:string;

    constructor(itemsId?:number,operationName?:string){
        this.itemsId = itemsId;
        this.operationName = operationName
    
}
}