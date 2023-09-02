export class SKUGenerationReq{
    itemCode: string;
    colorsInfo: any[];
    sizesInfo:any[];
    destinationsInfo: any[];
    createdUser:string;
    updatedUser:string;
    skuCode?: string;
    skuId?: number;

    constructor(itemCode: string,colorsInfo: any[],sizesInfo:any[],destinationsInfo: any[],createdUser:string,updatedUser:string,skuCode?: string,skuId?: number){
        this.itemCode = itemCode;
        this.colorsInfo = colorsInfo;
        this.sizesInfo = sizesInfo;
        this.destinationsInfo = destinationsInfo;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.skuCode = skuCode;
        this.skuId = skuId;
    }
}