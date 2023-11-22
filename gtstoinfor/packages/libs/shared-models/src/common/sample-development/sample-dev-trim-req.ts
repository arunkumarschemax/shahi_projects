export class SampleTrimReq {
    trimType:string
    trimCode:number
    productGroupId:number
    description: string
    consumption: number
    remarks: string
    trimInfoId?: number
    colourId?:number
    constructor(
        trimType:string,
        trimCode:number,
        productGroupId:number,
        description: string,
        consumption: number,
        remarks: string,
        trimInfoId?: number,
       colourId?:number

    ) {
        this.trimType=trimType
        this.trimCode=trimCode
        this.productGroupId=productGroupId
        this, description = description
        this.consumption = consumption
        this.remarks = remarks
        this.trimInfoId = trimInfoId
        this.colourId=colourId
    }

}