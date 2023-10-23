export class CoTypeModel{
    coTypeId: number;
    coType: string;
    isActive: boolean;
    versionFlag: number;

    constructor(coTypeId: number,coType: string,isActive: boolean,versionFlag: number){
        this.coTypeId = coTypeId
        this.coType = coType
        this.isActive = isActive
        this.versionFlag = versionFlag
    }
}