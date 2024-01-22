export class SampleFabricReq {
    fabricCode: number
    colourId: number
    consumption?: number
    uomId: number
    remarks: string
    fabricInfoId: number;
    totalRequirement: number;
    wastage: number;
    allocatedStock:any[];
    fabricUpload?:any;

    constructor(
        fabricCode: number,
        colourId: number,
        consumption: number,
        uomId: number,
        remarks: string,
        totalRequirement: number,
        wastage: number,
        allocatedStock:any[],
        fabricInfoId?: number,
        fabricUpload?:any
    ) {
        this.fabricCode = fabricCode
        this.colourId = colourId
        this.consumption = consumption
        this.uomId = uomId
        this.remarks = remarks
        this.totalRequirement = totalRequirement
        this.wastage = wastage
        this.fabricInfoId = fabricInfoId
        this.allocatedStock = allocatedStock
        this.fabricUpload = fabricUpload
    }

}