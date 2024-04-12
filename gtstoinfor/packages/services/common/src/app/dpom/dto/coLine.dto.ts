import { ApiProperty } from "@nestjs/swagger"

export class CoLineDto{
    @ApiProperty()
    id: number;
    @ApiProperty()
    buyerPo: string;
    @ApiProperty()
    division: number;

    @ApiProperty()
    PCH: string;

    @ApiProperty()
    facility: number;

    @ApiProperty()
    orderNo: string;

    @ApiProperty()
    customerCode: string;

    @ApiProperty()
    itemNo: string;

    @ApiProperty()
    itemDesc: string;

    @ApiProperty()
    orderQty: number;

    @ApiProperty()
    UOM: string;

    @ApiProperty()
    size: string;

    @ApiProperty()
    price: string;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    coFinalAppDate: string;
    @ApiProperty()
    PCD: string;

    @ApiProperty()
    commision: string;

    @ApiProperty()
    planNo: string;

    @ApiProperty()
    planUnit: string;

    @ApiProperty()
    payTerms: string;

    @ApiProperty()
    payTermsDesc: string;


}