import { ApiProperty } from "@nestjs/swagger";

export class SanmarDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    buyerPo: string

    @ApiProperty()
    poDate: string

    @ApiProperty()
    buyerAddress: string

    @ApiProperty()
    shipToAdd: string

    @ApiProperty()
    deliveryAddress: string

    @ApiProperty()
    poStyle: string

    @ApiProperty()
    deliveryDate: string

    @ApiProperty()
    quantity: string

    @ApiProperty()
    unit: string

    @ApiProperty()
    unitPrice: string

    @ApiProperty()
    size: string

    @ApiProperty()
    color: string


    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;

    @ApiProperty()
    updatedUser: string | null;
    poItemDetails: any;





}