export class BuyingHouseRequest{
    buyingHouseId : number;
    updatedUser:string;
    versionFlag?:number;
    isActive?:boolean;
    
    constructor(buyingHouseId : number,updatedUser:string,versionFlag?:number,isActive?:boolean)
    {
        this.buyingHouseId = buyingHouseId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        
    }
}
