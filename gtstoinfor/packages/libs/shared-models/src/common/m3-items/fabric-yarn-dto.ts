
export class FabricYarnDto {
    fabricYarnId: number;
    yarnType: string;
    count: number;
    uomId: number;
    createdUser: string | null;
    updatedUser: string | null;
    createdAt: string;
    updatedAt: string;
    versionFlag: number;

    constructor(
        fabricYarnId: number,
        yarnType: string,
        count: number,
        uomId: number,
        createdUser: string | null,
        updatedUser: string | null,
        createdAt: string,
        updatedAt: string,
        versionFlag: number,
    ){
        this.fabricYarnId = fabricYarnId
        this.yarnType = yarnType
        this.count = count
        this.uomId = uomId
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.updatedAt = updatedAt
        this.versionFlag = versionFlag
    }


}

