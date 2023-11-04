
export class MaterialTrimDto{
    materialTrimId:number;
    description:string;
    colorId: number
    consumption:number;
    consumptionUom:string;
    issuedQuantity: number
    issuedQuantityUom: string
    remarks:string;
    createdAt: Date;
    createdUser: string | null;

    constructor(
        materialTrimId:number,
        description:string,
        colorId: number,
        consumption:number,
        consumptionUom:string,
        issuedQuantity: number,
        issuedQuantityUom: string,
        remarks:string,
        createdAt: Date,
        createdUser: string | null,
    ){
        this.materialTrimId = materialTrimId
        this.description = description
        this.colorId = colorId
        this.consumption = consumption
        this.consumptionUom = consumptionUom
        this.issuedQuantity = issuedQuantity
        this.issuedQuantityUom = issuedQuantityUom
        this.remarks = remarks
        this.createdAt = createdAt
        this.createdUser = createdUser
    }
}