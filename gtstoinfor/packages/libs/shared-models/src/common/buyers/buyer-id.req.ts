export class BuyerIdReq{
    buyerId:number;
    trimType?: string
    trimCatId?: number
    trimMapId?: any 

    constructor(
        buyerId:number,
        trimType?: string,
        trimCatId?: number,
        trimMapId?: any
        ){
        this.buyerId = buyerId
        this.trimType = trimType
        this.trimCatId = trimCatId
        this.trimMapId = trimMapId
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