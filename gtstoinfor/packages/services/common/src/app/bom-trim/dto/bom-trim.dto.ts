import { ApiProperty } from "@nestjs/swagger";
import { IsImportedItemEnum } from "@project-management-system/shared-models";
import { IsOptional, Matches, MaxLength } from "class-validator";

export class BomTrimDto {

    @ApiProperty()
    itemTypeId : number;

    @ApiProperty()
    pchId : number;
     
    @ApiProperty()
    facilityId : number;

    @ApiProperty()
    trimCode :string;

    @ApiProperty()
    trim : string;

    @ApiProperty()
    genericCode: string;

    // @ApiProperty()
    // typeId : number;

    @ApiProperty()
    productGroupId: number;

    @ApiProperty()
    useInOperationId : number;

    @ApiProperty()
    description : string;

    @ApiProperty()
    responsible : string;

    @ApiProperty()
    developmentResponsible:string;

    @ApiProperty()
    basicUomId : number;

    @ApiProperty()
    alternateUomId : number;

    @ApiProperty()
    factor : string;

    @ApiProperty()
    orderMultipleBuom: string;

    @ApiProperty()
    moq: string;

    @ApiProperty()
    orderMultipleAuom: string;

    @ApiProperty()
    currencyId : number;


    @ApiProperty()
    price : number;

    @ApiProperty()
    taxPercentage : number;


    @ApiProperty()
    totalPrice : number;


    @ApiProperty()
    purchasePriceQuantity : number;
    
    @ApiProperty()
    salesTax : string;
     
    @ApiProperty()
    exciseDuty : string;

    @ApiProperty()
    licenceId : number;

    @ApiProperty()
    property : string;

    @ApiProperty()
    isSaleItem : IsImportedItemEnum;

    @ApiProperty()
    consumption : number;

    @ApiProperty()
    wastagePercentage : number;

    @ApiProperty()
    costGroup : string;

    @ApiProperty()
    usageRemarks: string;

    @ApiProperty()
    isImportedItem: IsImportedItemEnum;

    @ApiProperty()
    itemGroup: string;

  
}
