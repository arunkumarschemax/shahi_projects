export class PaymentTermsDropDownDto{
    paymentTermsId : number;
    paymentTermsName : string;
    
    /**
     * 
     * @param paymentTermsId number
     * @param paymentTermsName string
     */
    constructor(paymentTermsId : number,paymentTermsName : string){
        this.paymentTermsId = paymentTermsId;
        this.paymentTermsName = paymentTermsName;
    }
}