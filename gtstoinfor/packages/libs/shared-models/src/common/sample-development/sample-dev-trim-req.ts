export class SampleTrimReq {
    trimCode:string
    productGroupId:number
    description: string
    consumption: number
    remarks: string
    trimInfoId?: number
    constructor(
        trimCode:string,
        productGroupId:number,
        description: string,
        consumption: number,
        remarks: string,
        trimInfoId?: number
    ) {
        this.trimCode=trimCode
        this.productGroupId=productGroupId
        this, description = description
        this.consumption = consumption
        this.remarks = remarks
        this.trimInfoId = trimInfoId
    }

}