export class MarketingRequisitionDto {
    marketingReqId: number;
    trimType: string;
    trimCode: string;
    description: string;
    sizeId: number;
    colorId : number;
    quantity : number;
    remarks : string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;

    constructor(
    marketingReqId: number,
    trimType: string,
    description: string,
    sizeId: number,
    colorId : number,
    quantity : number,
    remarks : string,
    isActive: boolean,
    createdAt : Date | any,
    createdUser : string,
    updatedAt : Date | any,
    updatedUser : string,
    versionFlag : number,
    ){
        this.marketingReqId = marketingReqId
        this.trimType = trimType
        this.description = description
        this.sizeId = sizeId
        this.colorId = colorId
        this.quantity = quantity
        this.remarks = remarks
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}


