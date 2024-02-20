import { ApiProperty } from "@nestjs/swagger";

export class LevisDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    poNumber: string

    @ApiProperty()
    deliveryAddress: string
    
    @ApiProperty()
    currency: string

    @ApiProperty()
    poLine: string

    @ApiProperty()
    material: string

    // @ApiProperty()
    // totalUnitPrice: string

    // @ApiProperty()
    // originalDate: string

    @ApiProperty()
    transMode: string

    @ApiProperty()
    plannedExFactoryDate: string

    @ApiProperty()
    exFactoryDate: string


    
    @ApiProperty()
    itemNo: string

    // @ApiProperty()
    // product: string

    @ApiProperty()
    size: string

    @ApiProperty()
    upc: string

    @ApiProperty()
    quantity: string

    @ApiProperty()
    unitPrice: string

    @ApiProperty()
    scheduledDate: string
g


    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;

    @ApiProperty()
    updatedUser: string | null;
    poItemDetails: any;





}