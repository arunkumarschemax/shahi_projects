export class SampleTrimReq {
    trimType:string
    trimCode:number
    consumption: number
    totalRequirement: number
    wastage: number
    remarks: string
    allocatedStock: any[]
    trimInfoId?: number
    colourId?:number
    uomId?:number

    constructor(
        trimType:string,
        trimCode:number,
        consumption: number,
        totalRequirement: number,
        wastage: number,
        remarks: string,
        allocatedStock: any[],
        trimInfoId?: number,
       colourId?:number,uomId?:number

    ) {
        this.trimType=trimType
        this.trimCode=trimCode
        this.consumption = consumption
        this.totalRequirement = totalRequirement
        this.wastage = wastage
        this.remarks = remarks
        this.trimInfoId = trimInfoId
        this.allocatedStock=allocatedStock
        this.colourId=colourId
        this.uomId=uomId
    }

}