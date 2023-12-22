
export class FabricYarnDto {
    fabricYarnId: number;
    yarnType: string;
    countNum: number;
    countDenom: number;
    uomId: number;
    createdUser: string | null;
    updatedUser: string | null;
    createdAt: string;
    updatedAt: string;
    versionFlag: number;

    constructor(
        fabricYarnId: number,
        yarnType: string,
        countNum: number,
        countDenom: number,
        uomId: number,
        createdUser: string | null,
        updatedUser: string | null,
        createdAt: string,
        updatedAt: string,
        versionFlag: number,
    ){
        this.fabricYarnId = fabricYarnId
        this.yarnType = yarnType
        this.countNum = countNum
        this.countDenom = countDenom
        this.uomId = uomId
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.updatedAt = updatedAt
        this.versionFlag = versionFlag
    }


}

