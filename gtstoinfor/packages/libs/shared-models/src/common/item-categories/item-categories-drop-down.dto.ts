export class ItemCategoryDropDownDto{
    itemCategoryId : number;
    itemCategory : string;
    itemCategoryCode? : string;
    saleOrderId?:number;
    
    /**
     * 
     * @param itemCategoryId number
     * @param itemCategory string
     * @param itemCategoryCode string
     */
    constructor(itemCategoryId : number,itemCategory : string,itemCategoryCode? : string,saleOrderId?:number){
        this.itemCategoryId = itemCategoryId;
        this.itemCategory = itemCategory;
        this.itemCategoryCode = itemCategoryCode;
        this.saleOrderId = saleOrderId;
    }
}