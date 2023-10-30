// export class SKUGenerationModel{
//     skuId:number;
//     itemCode: string;
//     skuCode:string;
//     colorsInfo: any[];
//     sizesInfo:any[];
//     destinationsInfo: any[];

//     constructor(skuId:number,itemCode: string,skuCode:string,colorsInfo: any[],sizesInfo:any[],destinationsInfo: any[]){
//         this.skuId = skuId;
//         this.itemCode = itemCode;
//         this.skuCode = skuCode;
//         this.colorsInfo = colorsInfo;
//         this.sizesInfo = sizesInfo;
//         this.destinationsInfo = destinationsInfo;
        
//     }
// }

import { SkuStatusEnum } from "../../enum";
import { ColorInfoReq } from "./color-info-req";
import { DestinationInfoReq } from "./destination-info-req";
import { SizeInfoReq } from "./size-info-req";

export class ItemSKusModel {
    skuId:number;
    skuCode:string;
    itemId: number;
    itemCode: string;
    status: SkuStatusEnum;
    colorInfo:ColorInfoReq[];
    sizeInfo:SizeInfoReq[];
    destinationInfo:DestinationInfoReq[];
    createdUser: string;
    styleId: number;
    style: string;
    divisionId?: number;
    divisionName?: string;

    constructor(skuId:number,skuCode:string,itemId: number,itemCode: string,status: SkuStatusEnum,colorInfo:ColorInfoReq[],sizeInfo:SizeInfoReq[],destinationInfo:DestinationInfoReq[],createdUser: string,styleId: number,style:string,divisionId?: number,
        divisionName?: string){
        this.skuId = skuId;
        this.skuCode = skuCode;
        this.itemId = itemId;
        this.itemCode = itemCode;
        this.status = status;
        this.colorInfo = colorInfo;
        this.sizeInfo = sizeInfo;
        this.destinationInfo = destinationInfo;
        this.createdUser = createdUser;
        this.styleId = styleId
        this.style = style
        this.divisionId = divisionId
        this.divisionName = divisionName
    }
    
}