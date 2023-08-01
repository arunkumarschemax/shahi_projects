export class GarmentCategoryDropDownDto{
    garmentCategoryId : number;
    garmentCategory : string;
    // saleOrderId?:number;
    
    /**
     * 
     * @param garmentCategoryId number
     * @param garmentCategory string
     */
    constructor(garmentCategoryId  : number,garmentCategory : string,saleOrderId?:number){
        this.garmentCategoryId = garmentCategoryId;
        this.garmentCategory = garmentCategory;
        
        // this.saleOrderId = saleOrderId;
    }
}