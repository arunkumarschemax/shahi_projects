export class HMStylesModelDto{
    hmId:number;
    styleNumber:string;
    teflonSheetSize:string;
    consumption:number;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param hmId This is a number
     * @param styleNumber This is a string
     * @param teflonSheetSize This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(hmId:number,styleNumber:string,teflonSheetSize:string, consumption:number,createdUser:string,updatedUser:string,isActive:boolean){
        this.hmId = hmId;
        this.styleNumber = styleNumber;
        this.teflonSheetSize=teflonSheetSize;
        this.consumption=consumption;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
    }
}