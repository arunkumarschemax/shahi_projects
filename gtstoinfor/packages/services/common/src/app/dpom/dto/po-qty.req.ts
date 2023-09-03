import { ApiProperty } from "@nestjs/swagger";

export class PoAndQtyReq {
    @ApiProperty()
    month: number;
    @ApiProperty()
    year: number;
    @ApiProperty()
    reportType: string;
    // @ApiProperty()
    // unitId?: number;
   
}