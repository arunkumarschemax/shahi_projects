export class GarmentDropDownDto{
    garmentId : number;
    garment : string;
    
    /**
     * 
     * @param itemCategoryId number
     * @param itemCategory string
     */
    constructor(garmentId : number,garment : string,itemCategoryCode? : string){
        this.garmentId = garmentId;
        this.garment = garment;
    }
}