export class OperationReportingModel{
    jobNumber : string;
    skuCode: string;
    poNumber:string;
    issuedQuantity: number;
    inventory?: number;
    style?:string;
    styleDescription?: string;
    rejectedQuantity?: number;

    constructor(jobNumber : string,skuCode: string,poNumber:string,issuedQuantity: number,inventory?: number,style?:string,styleDescription?: string,rejectedQuantity?: number){
        this.jobNumber = jobNumber;
        this.skuCode = skuCode;
        this.poNumber = poNumber;
        this.issuedQuantity = issuedQuantity;
        this.inventory = inventory;
        this.style = style;
        this.styleDescription = styleDescription;
        this.rejectedQuantity = rejectedQuantity;
    }
}