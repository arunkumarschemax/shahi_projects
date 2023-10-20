export class BusinessAreaModel{
    businessAreaId: number;
    businessAreaCode: string;
    businessAreaName: string;
    isActive: boolean;
    versionFlag: number;

    constructor(businessAreaId: number,businessAreaCode: string,businessAreaName: string,isActive: boolean,versionFlag: number){
        this.businessAreaId = businessAreaId
        this.businessAreaCode = businessAreaCode
        this.businessAreaName = businessAreaName
        this.isActive = isActive
        this.versionFlag = versionFlag
    }
}