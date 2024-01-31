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
    buyerAddress: string





    @ApiProperty()
    poLine: number

    @ApiProperty()
    material: string

    @ApiProperty()
    ppkupc:string

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
    currency: string

    @ApiProperty()
    totalQuantity: string

    @ApiProperty()
    style: string

    @ApiProperty()
    poType: string



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

    @ApiProperty()
    comptMaterial: string

    @ApiProperty()
    ratio:string


    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;

    @ApiProperty()
    updatedUser: string | null;
    poItemDetails: any;


    
    @ApiProperty()
    eachPerCarton: string



}