export class SampleTrimReq {
    trimType:string
    trimCode:number
    consumption: number
    remarks: string
    trimInfoId?: number
    colourId?:number
    uomId?:number

    constructor(
        trimType:string,
        trimCode:number,
        consumption: number,
        remarks: string,
        trimInfoId?: number,
       colourId?:number,uomId?:number

    ) {
        this.trimType=trimType
        this.trimCode=trimCode
        this.consumption = consumption
        this.remarks = remarks
        this.trimInfoId = trimInfoId
        this.colourId=colourId
        this.uomId=uomId
    }

}