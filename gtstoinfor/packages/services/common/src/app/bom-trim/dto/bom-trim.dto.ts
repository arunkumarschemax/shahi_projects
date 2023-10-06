import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Matches, MaxLength } from "class-validator";

export class BomTrimDto {

    @ApiProperty()
    itemsId : number;

    @ApiProperty()
    pchId : number;
     
    @ApiProperty()
    facilityId : number;

    @ApiProperty()
    trimCode :string;

    @ApiProperty()
    trimId : number;

    @ApiProperty()
    genericCode: string;

    @ApiProperty()
    typeId : number;

    @ApiProperty()
    groupId: number;

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
    isSaleItem : string;

    @ApiProperty()
    consumption : number;

    @ApiProperty()
    wastagePercentage : number;

    @ApiProperty()
    costGroup : string;

    @ApiProperty()
    usageRemarks: string;

  
}
