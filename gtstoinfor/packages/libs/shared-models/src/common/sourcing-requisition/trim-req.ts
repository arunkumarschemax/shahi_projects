export class TrimInfoReq{
    trimType: string
    trimCode : number
    quantity : number
    uomId: number
    remarks : string
    constructor(
        trimType: string,
    trimCode : number,
    quantity : number,
    uomId: number,
    remarks : string,
    )
    {
        this.trimType = trimType
        this.trimCode = trimCode
        this.quantity = quantity
        this.uomId = uomId
        this.remarks = remarks
    }
}