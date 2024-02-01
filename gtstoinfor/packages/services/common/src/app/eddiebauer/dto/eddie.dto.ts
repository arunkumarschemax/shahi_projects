import { ApiProperty } from "@nestjs/swagger";

export class EddieDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    poNumber: string

    @ApiProperty()
    poDate: string

    @ApiProperty()
    incoterm: string

    @ApiProperty()
    shipToAdd: string

    @ApiProperty()
    manufacture: string

    @ApiProperty()
    buyerAddress: string

    @ApiProperty()
    paymentTerms: string

    @ApiProperty()
    shipmentMode: string


    @ApiProperty()
    poLine: number

    @ApiProperty()
    buyerItem: string

    @ApiProperty()
    shortDescription: string

    @ApiProperty()
    currency: string



    @ApiProperty()
    sizeCode: string

    @ApiProperty()
    size: string

    @ApiProperty()
    upc: string

    @ApiProperty()
    sku: string

    @ApiProperty()
    quantityPerInnerPack: string

    @ApiProperty()
    retailPrice: string

    @ApiProperty()
    quantity: string

    @ApiProperty()
    unit: string

    @ApiProperty()
    unitCost: string

    @ApiProperty()
    cost: string

    

    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;

    @ApiProperty()
    updatedUser: string | null;
    poItemDetails: any;





}