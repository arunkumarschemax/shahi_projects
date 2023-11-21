import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PropertyEnum, SubContractStatus } from "packages/libs/shared-models/src/enum";

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
    category: string;

    @ApiProperty()
    subCategoryId: number;

    @ApiProperty()
    property:PropertyEnum

    @ApiProperty()
    season: string;

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
    altUoms: string;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    targetCurrency: string;

    @ApiProperty()
    conversionFactor: string;

    @ApiProperty()
    projectionOrder: string;

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
    itemGroup: string;

    @ApiProperty()
    productGroup: string;

    @ApiProperty()
    businessArea: string;

    @ApiProperty()
    basicUom: string;

    @ApiProperty()
    groupTechClass: string;

    @ApiProperty()
    composition: string;

    @ApiProperty()
    range: string;

    @ApiProperty()
    noOfLacePanel: string;

    @ApiProperty()
    searchGroup: number;

    @ApiProperty()
    reference: string;

    @ApiProperty()
    isActive: boolean;
    
    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
    updatedAt: Date;

    @ApiProperty()
    @IsOptional()
     @IsNumber()
    versionFlag: number;

    @ApiProperty()
    @IsNotEmpty()
    fgitemId?:number;

}