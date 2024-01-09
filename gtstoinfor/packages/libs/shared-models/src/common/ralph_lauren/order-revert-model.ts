export class OrderRevertModel {
    pdfId: number;
    poNumber:string;
   

    constructor(pdfId: number, poNumber: string) {
        this.pdfId = pdfId
        this.poNumber = poNumber
      
    }
}