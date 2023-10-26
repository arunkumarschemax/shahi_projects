export class BusinessAreaActivateReq{
    businessAreaId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( businessAreaId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.businessAreaId = businessAreaId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}