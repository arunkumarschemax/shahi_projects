import { ApiProperty } from "@nestjs/swagger";

export class LegalPoPdfDto{
    @ApiProperty()
    poNumber : string;
    @ApiProperty()
    purchaseOrderNumber: string;
    @ApiProperty()
    poLineItemNumber: number;
    @ApiProperty()
    scheduleLineItemNumber: string;
    @ApiProperty()
    categoryCode: string;
    @ApiProperty()
    itemVasText: string;
    @ApiProperty()
    itemText: string;
    @ApiProperty()
    sizeQuantity: number;
    @ApiProperty()
    sizeDescription: string;
}