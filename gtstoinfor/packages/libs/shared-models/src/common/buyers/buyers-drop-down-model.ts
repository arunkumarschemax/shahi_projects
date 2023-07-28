export class BuyersDropDownData{
    buyerId:number;
    buyerName:string;
    buyerAddress:string[];
    buyerPaymentTerms:string;
    buyershipmentTerms:string;
    buyerdeliveryTerms:string;
    
    
    /**
     * 
     * @param buyerId 
     * @param buyerName 
     * @param buyerAddress
     * @param buyerPaymentTerms
     * @param buyershipmentTerms;
     * @param buyerdeliveryTerms;
     */
    constructor(buyerId:number,buyerName:string,buyerAddress:string[],buyerPaymentTerms:string,buyershipmentTerms:string,buyerdeliveryTerms:string){
      this.buyerId = buyerId;
      this.buyerName = buyerName;
      this.buyerAddress= buyerAddress;
      this.buyerPaymentTerms= buyerPaymentTerms;
      this.buyershipmentTerms= buyershipmentTerms;
      this.buyerdeliveryTerms= buyerdeliveryTerms;
    }
}