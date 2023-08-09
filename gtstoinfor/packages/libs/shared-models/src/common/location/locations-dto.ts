export class LocationDto{
    locationId : number;
    locationName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    
    /**
     * 
     * @param locationId number
     * @param locationName string
     * @param isActive boolean
     * @param createdUser string
     * @param updatedUser string
     * 
     */
    constructor(locationId : number,locationName : string,isActive: boolean,createdUser : string,updatedUser:string,){
        this.locationId = locationId;
        this.locationName = locationName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}
export const LocationDtoDefault : LocationDto = {
    locationId: 0,
    locationName: '',
    isActive: true,
    createdUser : '',
    updatedUser : '',



}; 