export class DestinationDto{
    destinationId:number;
    destination:string;
    destinationCode:string;
    description:string;
    optionGroup:string;
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
    
    constructor(destinationId:number,    destinationCode:string,description:string,optionGroup:string,destination:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.destinationId = destinationId;
        this.destination = destination;
        this.destinationCode=destinationCode;
        this.description=description;
        this.optionGroup=optionGroup;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
    }
}