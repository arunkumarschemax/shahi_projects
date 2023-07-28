import { ApiProperty } from "@nestjs/swagger";

export class VendorFilterRequest{
    @ApiProperty()
    vendorCode: string;

    @ApiProperty()
    contactNumber: string;

    @ApiProperty()
    city : string;
}