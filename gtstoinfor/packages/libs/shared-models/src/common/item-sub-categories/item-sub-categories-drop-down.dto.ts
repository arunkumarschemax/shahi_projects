export class ItemSubCategoryDropDownDto{
    itemSubCategoryId : number;
    itemSubCategory : string;
    itemSubCategoryCode? : string;
    
    /**
     * 
     * @param itemCategoryId number
     * @param itemCategory string
     * @param itemCategoryCode string
     */
    constructor(itemCategoryId : number,itemCategory : string,itemCategoryCode? : string,saleOrderId?:number){
        this.itemSubCategoryId = itemCategoryId;
        this.itemSubCategory = itemCategory;
        this.itemSubCategoryCode = itemCategoryCode;
    }
}