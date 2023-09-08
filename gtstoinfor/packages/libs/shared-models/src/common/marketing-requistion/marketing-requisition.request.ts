export class MarketingRequisitionRequest{
    marketingReqId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(marketingReqId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.marketingReqId = marketingReqId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
