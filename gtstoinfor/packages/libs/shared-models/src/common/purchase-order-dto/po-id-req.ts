export class VendorIdReq{
    vendorId?: number
    poId?: Number
    materialType?: string

    constructor(vendorId?:number, poId?:Number,materialType?: string){
        this.vendorId = vendorId
        this.poId = poId
        this.materialType = materialType
    }
}