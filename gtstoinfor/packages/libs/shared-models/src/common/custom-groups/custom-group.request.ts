export class CustomGroupRequest{
    customGroupId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(customGroupId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.customGroupId = customGroupId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
