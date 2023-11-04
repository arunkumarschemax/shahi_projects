import { ApiProperty } from "@nestjs/swagger";

export class OperationInventoryDto{
    @ApiProperty()
    operationIssuingId:number;
    @ApiProperty()
    styleId:number;
    @ApiProperty()
    operationSequenceId:number;
    @ApiProperty()
    operation:string;
    @ApiProperty()
    nextOperation:string;
    @ApiProperty()
    physicalQuantity:number;
    @ApiProperty()
    physicalUom:string;
    @ApiProperty()
    issuedQuantity:number;
    @ApiProperty()
    issuedUomId:number;
    @ApiProperty()
    damagedQuantity:number;
    @ApiProperty()
    damagedUomId:number;
    @ApiProperty()
    rejectedQuantity:number;
    @ApiProperty()
    rejectedUomId:number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    createdUser: string | null;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    updatedUser: string | null;
    @ApiProperty()
    versionFlag: number;

}