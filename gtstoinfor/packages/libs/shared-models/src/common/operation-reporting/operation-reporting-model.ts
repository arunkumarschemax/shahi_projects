export class OperationReportingModel{
    jobNumber : string;
    skuCode: string;
    poNumber:string;
    issuedQuantity: number;

    constructor(jobNumber : string,skuCode: string,poNumber:string,issuedQuantity: number){
        this.jobNumber = jobNumber;
        this.skuCode = skuCode;
        this.poNumber = poNumber;
        this.issuedQuantity = issuedQuantity;
    }
}