export class MasterLocationsDto{
    locationId:number;
    locationName:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param locationId This is a number
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     * @param fileName This is a string
     * @param versionFlag This is a string
     * @param versionFlag This is a string
     */
    
    constructor(locationId:number,updatedUser:string,isActive:boolean,versionFlag:number,locationName:string,
        createdUser:string){
        this.locationId = locationId;
         this.locationName = locationName;
         this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
        this.versionFlag = versionFlag
    }
}