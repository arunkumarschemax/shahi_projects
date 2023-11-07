export class SampleTrimReq {
    trimCode:string
    description: string
    consumption: number
    remarks: string
    trimInfoId?: number
    constructor(
        trimCode:string,
        description: string,
        consumption: number,
        remarks: string,
        trimInfoId?: number
    ) {
        this.trimCode=trimCode
        this, description = description
        this.consumption = consumption
        this.remarks = remarks
        this.trimInfoId = trimInfoId
    }

}