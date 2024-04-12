import { ApiProperty } from "@nestjs/swagger";

export class SanmarOrderDetailsReq {
   
    @ApiProperty()
    buyerPo: string;


}