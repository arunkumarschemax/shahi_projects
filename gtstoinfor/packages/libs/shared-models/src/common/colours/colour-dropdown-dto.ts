export class ColourDropDownDto{
    colourId : number;
    colour : string;
    // itemSubCategoryCode? : string;
    
    /**
     * 
     * @param divisionId number
     * @param divisionName string
     */
    constructor(divisionId : number,divisionName : string){
        this.colourId = divisionId;
        this. colour = divisionName;
    }
}