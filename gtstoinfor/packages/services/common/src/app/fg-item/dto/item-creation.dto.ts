import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { SubContractStatus } from "packages/libs/shared-models/src/enum";

export class ItemCreationDto {
    @ApiProperty()
    itemName: string;

    @ApiProperty()
    itemCode: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    itemTypeId: number;

    @ApiProperty()
    brandId: number;

    @ApiProperty()
    categoryId: number;

    @ApiProperty()
    subCategoryId: number;

    @ApiProperty()
    seasonId: number;

    @ApiProperty()
    responsiblePersonId: number;

    @ApiProperty()
    productDesignerId: number;

    @ApiProperty()
    approver: number;

    @ApiProperty()
    productionMerchant: number;

    @ApiProperty()
    pdMerchant: number;

    @ApiProperty()
    factoryMerchant: number;

    @ApiProperty()
    salePersonId: number;

    @ApiProperty()
    styleNo: string;

    @ApiProperty()
    internalStyleId: number;

    @ApiProperty()
    uom: string;

    @ApiProperty()
    altUom: string;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    targetCurrency: string;

    @ApiProperty()
    conversionFactorId: number;

    @ApiProperty()
    projectionOrderId: number;

    @ApiProperty()
    buyingHouseCommision: number;

    @ApiProperty()
    salePriceQty: number;

    @ApiProperty()
    licenseId: number;

    @ApiProperty()
    customGroupId: number;

    @ApiProperty()
    nationalDbk: number;

    @ApiProperty()
    roslGroup: number;

    @ApiProperty()
    isSubContract: SubContractStatus;

    @ApiProperty()
    salePrice: number;

    @ApiProperty()
    orderConfirmedDate: Date;

    @ApiProperty()
    firstExFactoryDate: Date;

    @ApiProperty()
    orderCloseDate: Date;

    @ApiProperty()
    moq: number;

    @ApiProperty()
    orderQty: number;

    @ApiProperty()
    facilityId: number;

    @ApiProperty()
    isActive: boolean;
    
    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
     @IsNumber()
    versionFlag: number;

    @ApiProperty()
    @IsNotEmpty()
    fgitemId?:number;

}