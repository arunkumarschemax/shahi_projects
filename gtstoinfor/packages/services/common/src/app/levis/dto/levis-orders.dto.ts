import { ApiProperty } from "@nestjs/swagger";

export class LevisDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    poNumber: string

    @ApiProperty()
    deliveryAddress: string
    
    @ApiProperty()
    transMode: string

    @ApiProperty()
    currency: string

    @ApiProperty()
    poLine: string

    @ApiProperty()
    material: string

    @ApiProperty()
    totalUnitPrice: string

    @ApiProperty()
    originalDate: string




    @ApiProperty()
    size: string

    @ApiProperty()
    upc: string

    @ApiProperty()
    plannedExFactoryDate: string

    @ApiProperty()
    exFactoryDate: string

    @ApiProperty()
    quantity: string

    @ApiProperty()
    unitPrice: string

    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;

    @ApiProperty()
    updatedUser: string | null;
    poItemDetails: any;





}