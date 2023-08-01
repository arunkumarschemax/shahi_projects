export class GarmentsDto{
    garmentId:number;
    garmentName:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param garmentId This is a number
     * @param garmentName This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(garmentId:number,garmentName:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.garmentId = garmentId;
        this.garmentName = garmentName;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;

        this.isActive = isActive;
    }
}