import { ApiProperty } from "@nestjs/swagger";

export class SupplierDto {
    @ApiProperty()
    category: string;
    @ApiProperty()
    supplierCode: string;
    @ApiProperty()
    supplierName: string;
    @ApiProperty()
    GstNumber: string;
    @ApiProperty()
    contactPerson: string;
    @ApiProperty()
    street: string;
    @ApiProperty()
    apartment: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    district: string;
    @ApiProperty()
    postalCode: number;
    @ApiProperty()
    commission: string;
    @ApiProperty()
    bankAccountNumber: number;
    @ApiProperty()
    bankIfsc: string;
    @ApiProperty()
    bankName: string;
    @ApiProperty()
    bankBranch: string;
    @ApiProperty()
    contactNumber: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    creditPaymentMethod: number;
    @ApiProperty()
    id?: number;
}