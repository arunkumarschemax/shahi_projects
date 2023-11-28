export class SampleFabricReq {
    fabricCode: number
    colourId: number
    consumption?: number
    uomId: number
    remarks: string
    fabricInfoId: number;
    totalRequirement: number;

    constructor(
        fabricCode: number,
        colourId: number,
        consumption: number,
        uomId: number,
        remarks: string,
        totalRequirement: number,
        fabricInfoId?: number

    ) {
        this.fabricCode = fabricCode
        this.colourId = colourId
        this.consumption = consumption
        this.uomId = uomId
        this.remarks = remarks
        this.totalRequirement = totalRequirement
        this.fabricInfoId = fabricInfoId
    }

}