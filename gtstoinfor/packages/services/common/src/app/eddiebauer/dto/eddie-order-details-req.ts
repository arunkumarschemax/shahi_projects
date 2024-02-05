import { ApiProperty } from "@nestjs/swagger";

export class EddieDetailsReq {
   
    @ApiProperty()
    PoNumber: string;

    @ApiProperty()
    PoLine: string;


}