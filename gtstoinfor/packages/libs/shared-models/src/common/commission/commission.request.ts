export class CommissionRequest{
    commissionId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(commissionId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.commissionId = commissionId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
