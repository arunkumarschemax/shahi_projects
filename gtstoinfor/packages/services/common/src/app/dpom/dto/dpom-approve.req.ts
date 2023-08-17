import { ApiProperty } from "@nestjs/swagger";

export class DpomApproveReq {
    @ApiProperty()
    purchaseOrderNumber: string;
    @ApiProperty()
    poLineItemNumber: number;
    @ApiProperty()
    scheduleLineItemNumber: string;
}