import { ApiProperty } from "@nestjs/swagger";

export class EddieDetailsReq {
   
    @ApiProperty()
    poNumber: string;

    @ApiProperty()
    poLine: string;


}