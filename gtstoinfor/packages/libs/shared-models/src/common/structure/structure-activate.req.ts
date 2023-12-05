export class StructureActivateReq{
    structureId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( structureId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.structureId = structureId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}