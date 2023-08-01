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
    commision: string;
    @ApiProperty()
    bankAccountNo: number;
    @ApiProperty()
    bankIFSC: string;
    @ApiProperty()
    bankName: string;
    @ApiProperty()
    bankBranch: string;
    @ApiProperty()
    contactNumber: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    creditPaymentPeriod: number;
    @ApiProperty()
    id?: number;
    @ApiProperty()
    isActive?: boolean;
    @ApiProperty()
    versionFlag?: number;
    @ApiProperty()
    updatedUser?: string;   
    createdUser: any;
   
}