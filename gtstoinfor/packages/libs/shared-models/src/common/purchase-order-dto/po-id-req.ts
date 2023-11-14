export class VendorIdReq{
    vendorId?: number
    poId?: Number

    constructor(vendorId?:number, poId?:Number){
        this.vendorId = vendorId
        this.poId = poId
    }
}