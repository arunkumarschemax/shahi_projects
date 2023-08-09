export class ProfitCenterRequestDto{
    profitCenterId:number;
    updatedUser:string;
    profitCenter:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param profitCenterId This is a number
     * @param profitCenter This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(profitCenterId:number,updatedUser:string, profitCenter:string, isActive:boolean,versionFlag:number){
        this.profitCenterId = profitCenterId;
        this.updatedUser = updatedUser;
        this.profitCenter = profitCenter;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }