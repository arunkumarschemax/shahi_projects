export class SizesDropDownDto{
    sizeId : number;
    size : string;
    // itemSubCategoryCode? : string;
    
    /**
     * 
     * @param divisionId number
     * @param divisionName string
     */
    constructor(divisionId : number,divisionName : string){
        this.sizeId = divisionId;
        this.size = divisionName;
    }
}