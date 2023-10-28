export class ItemCreFilterRequest {

style?:string;
itemName?: string;
brandId?: number;



    constructor(
        style?:string,itemName?: string,    brandId?: number

    ) {
        this.style = style
        this.itemName = itemName
        this.brandId =brandId 
    }
}
