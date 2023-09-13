export class FabricWeaveDto {
    fabricWeaveId: number;
    fabricWeaveName: string;
    fabricWeaveCode: string;
    fabricWeaveImageName : string;
    fabricWeaveImagePath : string
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;

    constructor(
    fabricWeaveId: number,
    fabricWeaveName: string,
    fabricWeaveCode: string,
    fabricWeaveImageName : string,
    fabricWeaveImagePath : string,
    isActive: boolean,
    createdAt : Date | any,
    createdUser : string,
    updatedAt : Date | any,
    updatedUser : string,
    versionFlag : number,
    ){
        this.fabricWeaveId = fabricWeaveId
        this.fabricWeaveName = fabricWeaveName
        this.fabricWeaveCode = fabricWeaveCode
        this.fabricWeaveImageName = fabricWeaveImageName
        this.fabricWeaveImagePath = fabricWeaveImagePath
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}



