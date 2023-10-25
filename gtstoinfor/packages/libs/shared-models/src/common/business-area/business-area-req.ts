export class BusinessAreaReq{
    businessAreaCode: string;
    businessAreaName: string;
    createdUser: string;
    businessAreaId?: number;

    constructor(businessAreaCode: string,businessAreaName: string,createdUser: string, businessAreaId?: number){
        this.businessAreaCode = businessAreaCode
        this.businessAreaName = businessAreaName
        this.createdUser = createdUser
        this.businessAreaId = businessAreaId
    }
}