export class CurrencyDto{
    currencyId:number;
    currencyName:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param currencyId This is a number
     * @param currencyName This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(currencyId:number,currencyName:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.currencyId = currencyId;
        this.currencyName = currencyName;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;

        this.isActive = isActive;
    }
}