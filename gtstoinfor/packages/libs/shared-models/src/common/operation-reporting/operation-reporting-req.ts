export class OperationReportingRequest{
    jobNumber : string;
    skuCode: string;
    poNumber:string;
    issuedQuantity: number;
    reportedQuantity:number;
    rejectedQuantity : number;
    wastedQuantity: number;

    constructor(jobNumber : string,skuCode: string,poNumber:string,issuedQuantity: number,reportedQuantity:number,rejectedQuantity : number,wastedQuantity: number){
        this.jobNumber = jobNumber;
        this.skuCode = skuCode;
        this.poNumber = poNumber;
        this.issuedQuantity = issuedQuantity;
        this.reportedQuantity = reportedQuantity;
        this.rejectedQuantity = rejectedQuantity;
        this.wastedQuantity = wastedQuantity;
    }
}