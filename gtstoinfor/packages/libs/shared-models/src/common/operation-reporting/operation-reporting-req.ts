export class OperationReportingRequest{
    itemCode:string;
    jobNumber : string;
    skuCode: string;
    poNumber:string;
    issuedQuantity: number;
    reportedQuantity:number;
    rejectedQuantity : number;
    wastedQuantity: number;

    constructor(itemCode:string,jobNumber : string,skuCode: string,poNumber:string,issuedQuantity: number,reportedQuantity:number,rejectedQuantity : number,wastedQuantity: number){
        this.itemCode = itemCode;
        this.jobNumber = jobNumber;
        this.skuCode = skuCode;
        this.poNumber = poNumber;
        this.issuedQuantity = issuedQuantity;
        this.reportedQuantity = reportedQuantity;
        this.rejectedQuantity = rejectedQuantity;
        this.wastedQuantity = wastedQuantity;
    }
}