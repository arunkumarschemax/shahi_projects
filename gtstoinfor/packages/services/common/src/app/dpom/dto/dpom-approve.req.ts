import { ApiProperty } from "@nestjs/swagger";

export class DpomApproveReq {
    @ApiProperty()
    poNumber: string;
    @ApiProperty()
    poLineItemNunber:number;
    
}