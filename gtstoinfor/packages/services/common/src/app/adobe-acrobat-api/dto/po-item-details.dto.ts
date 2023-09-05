import { ApiProperty } from "@nestjs/swagger";
import { PoItemVariantDto } from "./po-item-variant-details";

export class PoItemDetailsDto {
    @ApiProperty()
    itemNo: string;
    @ApiProperty()
    matrial: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    deliveryDate: string;
    @ApiProperty()
    mode: string;
    @ApiProperty()
    acceptanceDate: string;
    @ApiProperty()
    shipToAddress: string;
    @ApiProperty()
    itemVasText: string;
    @ApiProperty()
    totalQuantity:string;
    @ApiProperty()
    totalPrice:string;
    @ApiProperty()
    poItemVariantDetails: PoItemVariantDto[]
    
}