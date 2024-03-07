export class BuyerIdReq{
    buyerId:number;
    trimType?: string
    trimCatId?: number
    trimMapId?: any 
    colorId?: number 
    sizeId?: number 



    constructor(
        buyerId:number,
        trimType?: string,
        trimCatId?: number,
        trimMapId?: any,
        colorId?: number,
        sizeId?: number 
        ){
        this.buyerId = buyerId
        this.trimType = trimType
        this.trimCatId = trimCatId
        this.trimMapId = trimMapId
        this.colorId = colorId
        this.sizeId = sizeId

    }
}


export class ExternalRefReq{
    externalRefNo?:string;
   grnNo?:string;
   material?:string;
    constructor(externalRefNo?:string,grnNo?:string,material?:string){
        this.externalRefNo = externalRefNo
        this.grnNo=grnNo
        this.material=material

    }
}