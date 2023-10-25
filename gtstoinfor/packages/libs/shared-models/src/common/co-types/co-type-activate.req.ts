export class CoTypeActivateReq{
    coTypeId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( coTypeId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.coTypeId = coTypeId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}