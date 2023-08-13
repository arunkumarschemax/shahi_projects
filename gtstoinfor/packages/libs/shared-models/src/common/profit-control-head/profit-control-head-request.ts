export class ProfitControlHeadRequestDto{
    profitControlHeadId:number;
    updatedUser:string;
    profitControlHead:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param profitControlHeadId This is a number
     * @param profitControlHeadThis is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(profitControlHeadId:number,updatedUser:string, profitControlHead:string, isActive:boolean,versionFlag:number){
        this.profitControlHeadId = profitControlHeadId;
        this.updatedUser = updatedUser;
        this.profitControlHead = profitControlHead;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }