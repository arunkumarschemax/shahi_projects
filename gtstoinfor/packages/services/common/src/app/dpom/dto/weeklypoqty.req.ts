import { ApiProperty } from "@nestjs/swagger";

export class WeeklyPoAndQtyReq {
    @ApiProperty()
    month: number;
    @ApiProperty()
    reportType: string;
    // @ApiProperty()
    // unitId?: number;
   
}