export class DestinationDto{
    destinationId:number;
    destination:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;
    destinationCode:string;
    operationGroup:string
    divisionId?:number
    description?:string
    /**
     * 
     * @param destinationId This is a number
     * @param destination This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(destinationId:number,destination:string,createdUser:string,updatedUser:string,isActive:boolean, 
        destinationCode:string ,
        operationGroup:string,
    divisionId?:number,
    description?:string       ){
        this.destinationId = destinationId;
        this.destination = destination;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
        this.destinationCode = destinationCode
        this.description =description
        this.operationGroup = operationGroup
        this.divisionId = divisionId
    }
}