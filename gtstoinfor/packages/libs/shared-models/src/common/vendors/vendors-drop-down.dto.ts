// import { GlobalStatus } from "@gtpl/shared-models/common-models";

export class VendorDropDownDto{
    vendorId:number;
    vendorName:string;
    currency?:string;
    // priceNeeded? : GlobalStatus;
    
    /**
     * 
     * @param vendorId 
     * @param vendorName 
     */
    constructor(vendorId:number, vendorName:string, currency?:string){
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.currency = currency;
        // this.priceNeeded = priceNeeded;
    }
}