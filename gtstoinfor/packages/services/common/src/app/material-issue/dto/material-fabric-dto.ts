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
    consumptionUomId:number;

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
}