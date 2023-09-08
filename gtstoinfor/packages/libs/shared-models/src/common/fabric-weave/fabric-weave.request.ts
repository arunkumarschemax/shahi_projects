export class FabricWeaveRequest{
    fabricWeaveId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(fabricWeaveId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.fabricWeaveId = fabricWeaveId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
