export class BuyerIdReq{
    buyerId:number;

    constructor(buyerId:number){
        this.buyerId = buyerId
    }
}


export class ExternalRefReq{
    externalRefNo?:string;

    constructor(externalRefNo?:string){
        this.externalRefNo = externalRefNo
    }
}