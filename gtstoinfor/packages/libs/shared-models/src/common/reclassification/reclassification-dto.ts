export class ReclassificationDto {

    reclassificationId: number;
    stockId: number;
    quantity: number;
    itemId: number;
    location: number;
    buyer: number;
    fromBuyer:number;
    isActive: boolean;
    createdUser: string;
    updatedUser: string;
    versionFlag: number;
    grnItemId?: number;
    uomId?: number;

    constructor(
        reclassificationId: number,stockId: number,quantity: number,itemId: number,location: number,buyer: number,fromBuyer:number,isActive: boolean,createdUser: string,updatedUser: string,versionFlag: number, grnItemId?: number,uomId?: number){
            this.reclassificationId = reclassificationId;
            this.stockId = stockId;
            this.quantity = quantity;
            this.itemId = itemId;
            this.location = location;
            this.isActive = isActive;
            this.createdUser = createdUser;
            this.updatedUser = updatedUser;
            this.versionFlag = versionFlag;
            this.buyer = buyer;
            this.fromBuyer = fromBuyer;
            this.grnItemId = grnItemId;
            this.uomId = uomId;
        }
}
