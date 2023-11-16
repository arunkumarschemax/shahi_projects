import { ApiProperty } from "@nestjs/swagger";

export class GRNItemDto{
    @ApiProperty()
    grnItemId:number
    @ApiProperty()
    m3ItemCodeId:number
    @ApiProperty()
    productGroupId:number
    @ApiProperty()
    receivedQuantity:string
    @ApiProperty()
    receivedUomId:number
    @ApiProperty()
    acceptedQuantity:string
    @ApiProperty()
    acceptedUomId:number
    @ApiProperty()
    rejectedQuantity:string
    @ApiProperty()
    rejectedUomId:number
    @ApiProperty()
    conversionQuantity:string
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


}