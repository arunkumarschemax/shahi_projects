export class DeliveryTermsDropDownDto{
    deliveryTermsId : number;
    deliveryTermsName : string;
    
    /**
     * 
     * @param deliveryTermsId number
     * @param deliveryTermsName string
     */
    constructor(deliveryTermsId : number,deliveryTermsName : string){
        this.deliveryTermsId = deliveryTermsId;
        this.deliveryTermsName = deliveryTermsName;
    }
}