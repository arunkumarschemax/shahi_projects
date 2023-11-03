import { ApiProperty } from "@nestjs/swagger";
import { PropertyEnum } from "@project-management-system/shared-models";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class RmCreationDto{
    @ApiProperty()
    rmitemId:number;

    @ApiProperty()
    itemCode:string;

    @ApiProperty()
    itemCategoryId:number

    @ApiProperty()
    pchId:number

    @ApiProperty()
    facilityID:number

    @ApiProperty()
    genericCode:string

    @ApiProperty()
    structure:string

    @ApiProperty()
    quality:string

    @ApiProperty()
    description:string

    @ApiProperty()
    itemIypeId:number

    @ApiProperty()
    placement:string

    @ApiProperty()
    fabricFinishId:number

    @ApiProperty()
    responsible:string

    @ApiProperty()
    devResponsible:string

    @ApiProperty()
    basicUomId:number

    @ApiProperty()
    altUomId:number

    @ApiProperty()
    multiplicationFactor:string

    @ApiProperty()
    currencyId:number

    @ApiProperty()
    price:string

    @ApiProperty()
    tax:string

    @ApiProperty()
    purchasePriceQty:string

    @ApiProperty()
    saleTax:string

    @ApiProperty()
    exciseDuty:string

    @ApiProperty()
    licenseId:number

    @ApiProperty()
    property:PropertyEnum

    @ApiProperty()
    SaleItem:string

    @ApiProperty()
    wastage:string

    @ApiProperty()
    costGroup:string

    @ApiProperty()
    remarks:string

    @ApiProperty()
    itemGroupId:number
i
    @ApiProperty()
    useInOperation:string

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
}