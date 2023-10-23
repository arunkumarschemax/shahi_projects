export class styleOrderReq {
    itemId:number
    coId?:number
    constructor(itemId:number, coId?:number){
        this.itemId = itemId
        this.coId = coId
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

