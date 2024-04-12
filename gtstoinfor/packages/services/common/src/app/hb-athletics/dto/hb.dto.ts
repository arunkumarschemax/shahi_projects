import { ApiProperty } from "@nestjs/swagger";

export class HbDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    custPo: string
    
    @ApiProperty()
    shipToAdd: string

    

    @ApiProperty()
    style: string

    @ApiProperty()
    color: string
    

    @ApiProperty()
    size: string

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