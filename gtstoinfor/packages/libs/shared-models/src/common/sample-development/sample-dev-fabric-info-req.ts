export class SampleFabricReq {
    fabricCode: string
    description: string
    colourId: number
    consumption?: number
    remarks: string
    fabricInfoId: number;
    constructor(
        fabricCode: string,
        description: string,
        colourId: number,
        consumption: number,
        remarks: string,
        fabricInfoId?: number
    ) {
        this.fabricCode = fabricCode
        this.colourId = colourId
        this, description = description
        this.consumption = consumption
        this.remarks = remarks
        this.fabricInfoId = fabricInfoId
    }

}