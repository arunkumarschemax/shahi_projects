export class AccountControlObjectDropDownDto{
    accountControlObjectId : number;
    accountControlObject : string;
    // saleOrderId?:number;
    
    /**
     * 
     * @param accountControlObjectId number
     * @param accountControlObject string
     */
    constructor(accountControlObjectId  : number,accountControlObject : string){
        this.accountControlObjectId = accountControlObjectId;
        this.accountControlObject = accountControlObject;
        
        // this.saleOrderId = saleOrderId;
    }
}