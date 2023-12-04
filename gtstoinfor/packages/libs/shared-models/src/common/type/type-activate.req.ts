export class TypeActivateReq{
    typeId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( typeId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.typeId = typeId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}