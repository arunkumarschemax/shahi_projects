export class BuyerRefNoRequest{
    buyerRefNo:number;
    userId:number;
    buyerId?:number;


    // constructor(buyerRefNo:number){
    //     this.buyerRefNo = buyerRefNo
    // }
}

export class UpdateIdReq{
    id:number;
    m3ItemsId?: number
    constructor(id:number,m3ItemsId?: number){
        this.id = id
        this.m3ItemsId = m3ItemsId
    }
}