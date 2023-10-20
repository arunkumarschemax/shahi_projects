export class DestinationDropDownDto{
    destinationId : number;
    destination : string;
    // itemSubCategoryCode? : string;
    
    /**
     * 
     * @param divisionId number
     * @param divisionName string
     */
    constructor(divisionId : number,divisionName : string){
        this.destinationId = divisionId;
        this. destination = divisionName;
    }
}