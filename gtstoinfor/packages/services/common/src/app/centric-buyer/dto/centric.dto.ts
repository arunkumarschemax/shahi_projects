import { ApiProperty } from "@nestjs/swagger";

export class CentricDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    poNumber: string

    @ApiProperty()
    poDate: string

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
    division: string

    @ApiProperty()
    incoterm: string

    @ApiProperty()
    shipToAdd: string

    @ApiProperty()
    manufacture: string

    @ApiProperty()
    comptMaterial: string



    @ApiProperty()
    poLine: number

    @ApiProperty()
    material: string

    @ApiProperty()
    color: string

    @ApiProperty()
    gender: string

    @ApiProperty()
    shortDescription: string
    
    @ApiProperty()
    packMethod: string
    
    @ApiProperty()
    vendorBookingFlag: string



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