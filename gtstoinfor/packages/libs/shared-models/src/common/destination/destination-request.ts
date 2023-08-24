export class DestinationDto{
    destinationId:number;
    destination:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param destinationId This is a number
     * @param destination This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(destinationId:number,destination:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.destinationId = destinationId;
        this.destination = destination;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
    }
}