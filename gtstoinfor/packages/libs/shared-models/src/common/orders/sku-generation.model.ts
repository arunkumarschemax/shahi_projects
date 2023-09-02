export class SKUGenerationModel{
    skuId:number;
    itemCode: string;
    skuCode:string;
    colorsInfo: any[];
    sizesInfo:any[];
    destinationsInfo: any[];

    constructor(skuId:number,itemCode: string,skuCode:string,colorsInfo: any[],sizesInfo:any[],destinationsInfo: any[]){
        this.skuId = skuId;
        this.itemCode = itemCode;
        this.skuCode = skuCode;
        this.colorsInfo = colorsInfo;
        this.sizesInfo = sizesInfo;
        this.destinationsInfo = destinationsInfo;
        
    }
}