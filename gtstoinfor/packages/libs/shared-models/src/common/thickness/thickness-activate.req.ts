export class ThicknessActivateReq{
    thicknessId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( thicknessId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.thicknessId = thicknessId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}