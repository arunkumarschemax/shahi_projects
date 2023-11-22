export class SampleFabricReq {
    fabricCode: number
    description: string
    colourId: number
    productGroupId:number
    consumption?: number
    remarks: string
    fabricInfoId: number;
    constructor(
        fabricCode: number,
        description: string,
        colourId: number,
         productGroupId:number,
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
        this.productGroupId=productGroupId
    }

}