export class LocationDropDownDto{
    locationId : number;
    locationName : string;
    
    /**
     * 
     * @param locationId number
     * @param locationName string
     */
    constructor(locationId : number,locationName : string){
        this.locationId = locationId;
        this.locationName = locationName;
    }
}