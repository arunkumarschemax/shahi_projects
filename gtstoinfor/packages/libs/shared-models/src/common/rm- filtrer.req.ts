export class RMCreFilterRequest {

    
    buyer?: string;
    itemName?: string;
    itemGroup?: string;
    itemType?:string;
    productGroup?:string;
    procurementGroup?:string;
    
    
        constructor(
            buyer?: string,itemName?: string,itemGroup?: string, itemType?:string,productGroup?:string,procurementGroup?:string,
        ) {
           this.buyer = buyer
            this.itemName = itemName
            this.itemGroup =itemGroup 
            this.itemType = itemType 
            this.productGroup  = productGroup 
            this.procurementGroup = procurementGroup
        }
    }
    