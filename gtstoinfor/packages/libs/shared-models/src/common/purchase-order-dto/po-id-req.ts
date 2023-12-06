export class VendorIdReq{
    vendorId?: number
    poId?: Number
    materialType?: string
    poAgainst?: string
    buyerRefNo?: string

    constructor(vendorId?:number, poId?:Number,materialType?: string,poAgainst?: string,buyerRefNo?: string){
        this.vendorId = vendorId
        this.poId = poId
        this.materialType = materialType
        this.poAgainst = poAgainst
        this.buyerRefNo = buyerRefNo
    }
}