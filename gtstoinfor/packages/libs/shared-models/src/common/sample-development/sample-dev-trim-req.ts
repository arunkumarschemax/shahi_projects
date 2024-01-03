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
    uomStatus?:boolean


    constructor(
        trimType:string,
        trimCode:number,
        consumption: number,
        totalRequirement: number,
        wastage: number,
        remarks: string,
        allocatedStock: any[],
        trimInfoId?: number,
       colourId?:number,uomId?:number,uomStatus?:boolean

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
        this.uomStatus=uomStatus
    }

}