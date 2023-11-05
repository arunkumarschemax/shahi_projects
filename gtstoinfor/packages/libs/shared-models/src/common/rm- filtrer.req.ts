export class RMCreFilterRequest {

    
    buyer?: string;
    Currency?: string;
    itemGroup?: string;
    itemType?:string;
    productGroup?:string;
    procurementGroup?:string;
    
    
        constructor(
            buyer?: string,Currency?: string,itemGroup?: string, itemType?:string,productGroup?:string,procurementGroup?:string,
        ) {
           this.buyer = buyer
            this.Currency = Currency
            this.itemGroup =itemGroup 
            this.itemType = itemType 
            this.productGroup  = productGroup 
            this.procurementGroup = procurementGroup
        }
    }
    