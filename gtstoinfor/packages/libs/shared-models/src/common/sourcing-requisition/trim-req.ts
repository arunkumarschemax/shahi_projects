export class TrimInfoReq{
    trimType: string
    trimCode : string
    size : number
    color: number
    quantity : string
    m3TrimCode:string
    description: string
    remarks : string
    quantityUnit:string

    constructor(
        trimType: string,
        trimCode : string,
        size : number,
        color: number,
        quantity : string,
        m3TrimCode:string,
        description: string,
        remarks : string,
        quantityUnit: string
    )
    {
        this.trimType = trimType
        this.trimCode = trimCode
        this.size = size
        this.color = color
        this.quantity = quantity
        this.m3TrimCode = m3TrimCode
        this.description = description
        this.remarks = remarks
        this.quantityUnit = quantityUnit
    }
}