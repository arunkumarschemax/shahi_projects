import { ApiProperty } from "@nestjs/swagger";

export class MaterialTrimDto{
    @ApiProperty()
    materialTrimId:number;

    @ApiProperty()
    description:string;

    @ApiProperty()
    consumption:number;

    @ApiProperty()
    consumptionUom:string;

    @ApiProperty()
    issuedQuantity: number

    @ApiProperty()
    issuedQuantityUom: string

    @ApiProperty()
    remarks:string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdUser: string | null;

    constructor(
        materialTrimId:number,
        description:string,
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
        this.consumption = consumption
        this.consumptionUom = consumptionUom
        this.issuedQuantity = issuedQuantity
        this.issuedQuantityUom = issuedQuantityUom
        this.remarks = remarks
        this.createdAt = createdAt
        this.createdUser = createdUser
    }
}