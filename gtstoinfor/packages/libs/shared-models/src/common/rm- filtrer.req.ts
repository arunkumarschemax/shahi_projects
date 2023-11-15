export class RMCreFilterRequest {

    
    buyer?: string;
    Currency?: string;
    itemGroup?: string;
    itemType?:string;
    productGroup?:string;
    procurementGroup?:string;
    productGroupId?: number;
    
    
        constructor(
            buyer?: string,Currency?: string,itemGroup?: string, itemType?:string,productGroup?:string,procurementGroup?:string,productGroupId?: number
        ) {
           this.buyer = buyer
            this.Currency = Currency
            this.itemGroup =itemGroup 
            this.itemType = itemType 
            this.productGroup  = productGroup 
            this.procurementGroup = procurementGroup
            this.productGroupId = productGroupId
        }
    }
    