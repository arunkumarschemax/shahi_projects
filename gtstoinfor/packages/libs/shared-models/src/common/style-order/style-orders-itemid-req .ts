export class styleOrderReq {
    itemId:number
    coId?:number
    buyerId?:number
    constructor(itemId:number, coId?:number,buyerId?:number){
        this.itemId = itemId
        this.coId = coId
        this.buyerId = buyerId
    }
}



export class StyleOrderIdReq {
    styleOrderId:number
    destinationId?: number
    constructor(styleOrderId:number,destinationId?: number){
        this.styleOrderId = styleOrderId
        this.destinationId =destinationId
    }
}

export class VariantIdReq {
    variantId:number
    constructor(variantId:number){
        this.variantId = variantId
    }
}

