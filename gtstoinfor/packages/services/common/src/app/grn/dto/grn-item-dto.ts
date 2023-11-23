import { ApiProperty } from "@nestjs/swagger";
import { appConfig } from "packages/services/common/config";

export class GRNItemDto{
    @ApiProperty()
    grnItemId:number
    @ApiProperty()
    m3ItemCodeId:number
    @ApiProperty()
    productGroupId:number
    @ApiProperty()
    receivedQuantity:number
    @ApiProperty()
    receivedUomId:number
    @ApiProperty()
    acceptedQuantity:number
    @ApiProperty()
    acceptedUomId:number
    @ApiProperty()
    rejectedQuantity:number
    @ApiProperty()
    rejectedUomId:number
    @ApiProperty()
    conversionQuantity:number
    @ApiProperty()
    conversionUomId:number
    @ApiProperty()
    remarks:string
    @ApiProperty()
    createdAt?: Date;
    @ApiProperty()
    createdUser?: string | null;
    @ApiProperty()
    updatedAt?: Date;
    @ApiProperty()
    updatedUser?: string | null;
    @ApiProperty()
    versionFlag?: number;
    @ApiProperty()
    grnId?: number;
    @ApiProperty()
    poFabricId?: number;
    @ApiProperty()
    poTrimId?: number;
    @ApiProperty()
    indentFabricId?:number
    @ApiProperty()
    indentTrinId?:number
    @ApiProperty()
    m3FabricCode?: number
    @ApiProperty()
    m3TrimCode?: number
}