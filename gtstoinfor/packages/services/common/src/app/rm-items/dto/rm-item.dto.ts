import { ApiProperty } from "@nestjs/swagger";
import { IsImportedItemEnum, PropertyEnum } from "@project-management-system/shared-models";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class RmCreationDto{
    

    @ApiProperty()
    itemCode:string;

    @ApiProperty()
    itemCategoriesId:number

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
    itemName:string

    @ApiProperty()
    itemIypeId:number

    @ApiProperty()
    placement:string

    @ApiProperty()
    fabricFinishId:number

    @ApiProperty()
    responsibleId:number

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
    isImportedItem:IsImportedItemEnum


    @ApiProperty()
    supplyLeadTime:string

    @ApiProperty()
    supplier:string;


    @ApiProperty()
    consumption:string;


    @ApiProperty()
    total:number;


    @ApiProperty()
    deliveryTerms:string;


    @ApiProperty()
    deliveryMethod:string;


    @ApiProperty()
    saleItem:string

    @ApiProperty()
    wastage:string

    @ApiProperty()
    costGroup:string

    @ApiProperty()
    remarks:string

    @ApiProperty()
    itemGroupId:string

    @ApiProperty()
    useInOperation:string

    @ApiProperty()
    businessArea:number

    @ApiProperty()
    attachedWareHouse:string

    @ApiProperty()
    planner:string

    @ApiProperty()
    hierarchyLevelId:number

    @ApiProperty()
    productGroupId:number


    @ApiProperty()
    procurementGroupId:number

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