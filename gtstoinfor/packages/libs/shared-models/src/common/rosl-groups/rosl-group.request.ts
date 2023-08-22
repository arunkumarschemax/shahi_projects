export class ROSLGroupRequest{
    roslGroupId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(roslGroupId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.roslGroupId = roslGroupId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
