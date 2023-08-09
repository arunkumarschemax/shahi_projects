export class CompanyDto{
    companyId:number;
    companyName:string;
    companyCode:string;
    organizationCode:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param companyId This is a number
     * @param companyName This is a string
     * @param companyCode This is a string
     * @param organizationCode This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(companyId:number,companyName:string,companyCode:string,organizationCode:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.companyId = companyId;
        this.companyName = companyName;
        this.companyCode = companyCode;
        this.organizationCode = organizationCode;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
    }
}