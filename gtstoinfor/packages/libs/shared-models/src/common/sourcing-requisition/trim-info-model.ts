export class TrimInfoModel{
    trimType: string
    trimCode : string
    size : number
    color: number
    quantity : string
    m3TrimCode:string
    description: string
    remarks : string
    sizeName: string;
    colorName: string
    availableQuantity: number
    status: string
    quantityUnit: string
    shahiTrimCode:string

    constructor(
        trimType: string,
        trimCode : string,
        size : number,
        color: number,
        quantity : string,
        m3TrimCode:string,
        description: string,
        remarks : string,
        sizeName:string,
        colorName:string,
        availableQuantity: number,
        status: string,
        quantityUnit: string,
        shahiTrimCode :string
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
        this.sizeName = sizeName
        this.colorName = colorName
        this.availableQuantity = availableQuantity
        this.status = status
        this.quantityUnit = quantityUnit
        this.shahiTrimCode = shahiTrimCode
    }
}