export class BusinessAreaReq{
    businessAreaCode: string;
    businessAreaName: string;

    constructor(businessAreaCode: string,businessAreaName: string){
        this.businessAreaCode = businessAreaCode
        this.businessAreaName = businessAreaName
    }
}