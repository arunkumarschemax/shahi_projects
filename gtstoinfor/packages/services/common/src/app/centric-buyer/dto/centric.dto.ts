import { ApiProperty } from "@nestjs/swagger";

export class CentricDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    poNumber: string

    @ApiProperty()
    shipment: string

    @ApiProperty()
    season: string

    @ApiProperty()
    portOfExport: string

    @ApiProperty()
    portOfEntry: string

    @ApiProperty()
    Refrence: string

    @ApiProperty()
    paymentTermDescription: string

    @ApiProperty()
    specialInstructions: string

    @ApiProperty()
    poLine: string

    @ApiProperty()
    material: string

    @ApiProperty()
    color: string

    @ApiProperty()
    gender: string


    @ApiProperty()
    size: string


    @ApiProperty()
    upc: string

    @ApiProperty()
    label: string

    @ApiProperty()
    quantity: string

    @ApiProperty()
    unitPrice: string


    @ApiProperty()
    exFactory: string

    @ApiProperty()
    exPort: string


    @ApiProperty()
    deliveryDate: string

    @ApiProperty()
    retialPrice: string


    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;

    @ApiProperty()
    updatedUser: string | null;
    poItemDetails: any;





}