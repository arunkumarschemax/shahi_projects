import { ApiProperty } from "@nestjs/swagger";

export class OrderDetailsReq {
   
    @ApiProperty()
    poNumber: string;


}