import { ApiProperty } from "@nestjs/swagger";
import { MaterialFabricEnum } from "packages/libs/shared-models/src/enum";

export class MaterialFabricDto{
    @ApiProperty()
    materialFabricId:number;

    @ApiProperty()
    fabricCode:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    colorId: number

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
    status:MaterialFabricEnum;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdUser: string | null;

    constructor(
        materialFabricId:number,
        fabricCode:string,
        description:string,
        colorId: number,
        consumption:number,
        consumptionUom:string,
        issuedQuantity: number,
        issuedQuantityUom: string,
        remarks:string,
        status: MaterialFabricEnum,
        createdAt: Date,
        createdUser: string | null,
    ){
        this.materialFabricId = materialFabricId
        this.fabricCode = fabricCode
        this.description = description
        this.colorId = colorId
        this.consumption = consumption
        this.consumptionUom = consumptionUom
        this.issuedQuantity = issuedQuantity
        this.issuedQuantityUom = issuedQuantityUom
        this.remarks = remarks
        this.status = status
        this.createdAt = createdAt
        this.createdUser = createdUser
    }
}