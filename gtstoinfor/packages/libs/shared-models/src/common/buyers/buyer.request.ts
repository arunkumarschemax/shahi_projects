export class BuyerRequest{
    buyerId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(buyerId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.buyerId = buyerId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
