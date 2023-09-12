export class TrimInfoReq{
    trimType: string
    trimCode : string
    size : number
    color: number
    quantity : string
    description: string
    remarks : string

    constructor(
        trimType: string,
        trimCode : string,
        size : number,
        color: number,
        quantity : string,
        description: string,
        remarks : string
    )
    {
        this.trimType = trimType
        this.trimCode = trimCode
        this.size = size
        this.color = color
        this.description = description
        this.remarks = remarks
    }
}