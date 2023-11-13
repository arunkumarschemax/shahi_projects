
export class MaterialFabricDto{
    fabricCode:string;
    description:string;
    colorId: number
    consumption:number;
    consumptionUomId: number
    issuedQuantity: number
    issuedUomId: number
    remarks:string;
    createdAt?: Date;
    createdUser?: string | null;
    issuedQuantityUom?: string
    consumptionUom?:string;
    materialFabricId?:number;

    constructor(
        fabricCode:string,
        description:string,
        colorId: number,
        consumption:number,
        consumptionUomId:number,
        issuedQuantity: number,
        issuedUomId: number,
        remarks:string,
        createdAt?: Date,
        createdUser?: string | null,
        issuedQuantityUom?: string,
        consumptionUom?:string,
        materialFabricId?:number,
    ){
        this.materialFabricId = materialFabricId
        this.fabricCode = fabricCode
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