
export class MaterialTrimDto{
    trimCode: string;
    description:string;
    consumption:number;
    consumptionUomId:number
    issuedQuantity: number
    issuedUomId: number
    remarks:string;
    createdAt?: Date;
    createdUser?: string | null;
    consumptionUom?:string;
    issuedQuantityUom?: string
    materialTrimId:number;
    colorId?: number

    constructor(
        trimCode: string,
        description:string,
        consumption:number,
        consumptionUomId:number,
        issuedQuantity: number,
        issuedUomId: number,
        remarks:string,
        createdAt?: Date,
        createdUser?: string | null,
        consumptionUom?:string,
        issuedQuantityUom?: string,
        materialTrimId?:number,
        colorId?: number
    ){
        this.trimCode = trimCode
        this.materialTrimId = materialTrimId
        this.description = description
        this.colorId = colorId
        this.consumption = consumption
        this.consumptionUom = consumptionUom
        this.consumptionUomId = consumptionUomId
        this.issuedQuantity = issuedQuantity
        this.issuedQuantityUom = issuedQuantityUom
        this.issuedUomId = issuedUomId
        this.remarks = remarks
        this.createdAt = createdAt
        this.createdUser = createdUser
    }
}