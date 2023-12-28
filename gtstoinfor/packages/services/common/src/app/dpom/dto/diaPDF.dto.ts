import { ApiProperty } from "@nestjs/swagger"

export class DiaPDFDto {
    @ApiProperty()
    shipToAddress: string
    @ApiProperty()
    finalDestination: string;
    @ApiProperty()
    cabCode: string
    @ApiProperty()
    poNumber: string
    @ApiProperty()
    lineNo: any
}