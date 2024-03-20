import { ApiProperty } from "@nestjs/swagger";
import { UOMEnum } from "@project-management-system/shared-models";

export class ItemDto {
    @ApiProperty()
    itemId: number;

    @ApiProperty()
    item: string

    @ApiProperty()
    consumptionRequired: boolean

    @ApiProperty()
    consumption: number

    @ApiProperty()
    wastage: number

    @ApiProperty()
    moq: number

    @ApiProperty()
    printComponent: string


    @ApiProperty()
    consumptionAgainst: string

    @ApiProperty()
    uom: UOMEnum;

    @ApiProperty()
    createdAt: Date;


    @ApiProperty()
    createdUser: string | null;

    @ApiProperty()
    updatedAt: Date;


    @ApiProperty()
    updatedUser: string | null;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    wastageAgainst:string

    constructor(
        itemId: number,
        item: string,
        consumptionRequired: boolean, 
        consumption: number,
        wastage: number,
        moq: number,  
       printComponent: string ,  
       consumptionAgainst: string,
       wastageAgainst:string,
        uom: UOMEnum,   
      createdAt: Date,   
        createdUser: string | null,
        updatedAt: Date,  
       updatedUser: string | null,
        versionFlag: number,isActive: boolean
    ){
        this.itemId=itemId
        this.wastageAgainst=wastageAgainst
        this.item = item
        this.consumptionRequired = consumptionRequired
        this.consumption = consumption
        this.wastage = wastage
        this.moq = moq
        this.printComponent =printComponent
        this.consumptionAgainst = consumptionAgainst
        this.uom = uom
        this.createdAt = createdAt
        this.createdUser =createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }


}