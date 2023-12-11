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

    constructor(externalRefNo?:string){
        this.externalRefNo = externalRefNo
    }
}