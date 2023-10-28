export class ItemCreFilterRequest {

style?:string;
itemName?: string;
brandId?: number;
confirmStartDate?:string;
confirmEndDate?:string;



    constructor(
        style?:string,itemName?: string,brandId?: number,confirmStartDate?:string,confirmEndDate?:string

    ) {
        this.style = style
        this.itemName = itemName
        this.brandId =brandId 
        this.confirmStartDate = confirmStartDate 
        this.confirmEndDate  = confirmEndDate
    }
}
