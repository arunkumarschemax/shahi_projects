
export class MaterialTrimDto{
    materialTrimId:number;
    description:string;
    colorId: number
    consumption:number;
    consumptionUom:string;
    uomId:number
    issuedQuantity: number
    issuedQuantityUom: string
    issuedUomId: number
    remarks:string;
    createdAt: Date;
    createdUser: string | null;

    constructor(
        materialTrimId:number,
        description:string,
        colorId: number,
        consumption:number,
        consumptionUom:string,
        uomId:number,
        issuedQuantity: number,
        issuedQuantityUom: string,
        issuedUomId: number,
        remarks:string,
        createdAt: Date,
        createdUser: string | null,
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