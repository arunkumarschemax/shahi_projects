import { ReclassificationStatusEnum } from "../../enum";

export class ReclassificationApproveRequestDto {

    reclassificationId: number;
    stockId: number;
    quantity: number;
    itemId: number;
    location: number;
    styleId: number;
    buyer: number;
    fromBuyer:number;
    itemType: string;
    status:ReclassificationStatusEnum;
    grnItemId?: number;
    uomId?: number;

    constructor(
        reclassificationId: number,stockId: number,quantity: number,itemId: number,location: number,styleId: number,buyer: number,fromBuyer:number, itemType: string,status:ReclassificationStatusEnum,grnItemId?: number,uomId?: number){
            this.reclassificationId = reclassificationId;
            this.stockId = stockId;
            this.quantity = quantity;
            this.itemId = itemId;
            this.itemType = itemType;
            this.location = location;
            this.styleId = styleId;
            this.buyer = buyer;
            this.fromBuyer = fromBuyer;
            this.status = status;
            this.grnItemId = grnItemId;
            this.uomId = uomId;
        }
}
