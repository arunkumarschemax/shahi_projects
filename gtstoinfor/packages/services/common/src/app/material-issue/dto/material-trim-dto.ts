import { ApiProperty } from "@nestjs/swagger";

export class MaterialTrimDto{
    @ApiProperty()
    materialTrimId:number;

    @ApiProperty()
    description:string;

    @ApiProperty()
    colorId:number;

    @ApiProperty()
    consumption:number;

    @ApiProperty()
    consumptionUom:string;

    @ApiProperty()
    uomId:number;

    @ApiProperty()
    issuedQuantity: number

    @ApiProperty()
    issuedQuantityUom: string

    @ApiProperty()
    issuedUomId: number

    @ApiProperty()
    remarks:string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
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