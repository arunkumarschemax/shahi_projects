import { SkuStatusEnum } from "../../enum";
import { ColorInfoReq } from "./color-info-req";
import { DestinationInfoReq } from "./destination-info-req";
import { SizeInfoReq } from "./size-info-req";

export class ItemSKusReq {
    itemId: number;
    itemCode: string;
    status: SkuStatusEnum;
    colorInfo:ColorInfoReq[];
    sizeInfo:SizeInfoReq[];
    destinationInfo:DestinationInfoReq[];
    createdUser: string;

    constructor(itemId: number,itemCode: string,status: SkuStatusEnum,colorInfo:ColorInfoReq[],sizeInfo:SizeInfoReq[],destinationInfo:DestinationInfoReq[],createdUser: string){
        this.itemId = itemId;
        this.itemCode = itemCode;
        this.status = status;
        this.colorInfo = colorInfo;
        this.sizeInfo = sizeInfo;
        this.destinationInfo = destinationInfo;
        this.createdUser = createdUser;
    }
    
}