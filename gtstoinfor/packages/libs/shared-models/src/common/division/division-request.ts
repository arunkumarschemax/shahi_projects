export class DivisionDto{
    divisionId:number;
    divisionName:string;
    divisionCode:string;
    companyId:number;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param divisionId This is a number
     * @param divisionName This is a string
     * @param divisionCode This is a string
     * @param companyId This is a number
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(divisionId:number,divisionName:string,divisionCode:string,companyId:number,createdUser:string,updatedUser:string,isActive:boolean){
        this.divisionId = divisionId;
        this.divisionName = divisionName;
        this.divisionCode = divisionCode;
        this.companyId = companyId;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
    }
}