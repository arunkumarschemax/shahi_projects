import { FabricTypesDto } from "../fabric-types";

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
    fabricTypeId? : number

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
    fabricTypeId? : number

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
        this.fabricTypeId = fabricTypeId
    }
}

export class FabricTypeIdReq{
    fabricTypeId: number
    constructor(fabricTypeId:number){
        this.fabricTypeId =fabricTypeId
    }
}

