
export class MaterialTrimDto{
    description:string;
    consumption:number;
    uomId:number
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
        description:string,
        consumption:number,
        uomId:number,
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
        this.materialTrimId = materialTrimId
        this.description = description
        this.colorId = colorId
        this.consumption = consumption
        this.consumptionUom = consumptionUom
        this.uomId = uomId
        this.issuedQuantity = issuedQuantity
        this.issuedQuantityUom = issuedQuantityUom
        this.issuedUomId = issuedUomId
        this.remarks = remarks
        this.createdAt = createdAt
        this.createdUser = createdUser
    }
}