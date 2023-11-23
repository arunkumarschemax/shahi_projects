export class SampleFabricReq {
    fabricCode: number
    colourId: number
    consumption?: number
    uomId: number
    remarks: string
    fabricInfoId: number;
    constructor(
        fabricCode: number,
        colourId: number,
        consumption: number,
        uomId: number,
        remarks: string,
        fabricInfoId?: number
    ) {
        this.fabricCode = fabricCode
        this.colourId = colourId
        this.consumption = consumption
        this.uomId = uomId
        this.remarks = remarks
        this.fabricInfoId = fabricInfoId
    }

}