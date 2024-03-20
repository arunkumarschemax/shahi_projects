import { ApiProperty } from "@nestjs/swagger";
import { zFactorsBomDto } from "./z-factors-bom-dto";
import { ActionEnum } from "packages/libs/shared-models/src/Enum/z-factors-Enum";

export class zFactorsDto {
    @ApiProperty()
    id:number

    @ApiProperty()
    itemId:number
    
    @ApiProperty()
    actualIM:string

    @ApiProperty()
    action:ActionEnum

    @ApiProperty()
    geoCode:boolean

    @ApiProperty()
    destination:boolean

    @ApiProperty()
    size:boolean

    @ApiProperty()
    gender:boolean

    @ApiProperty()
    plant:boolean

    @ApiProperty()
    style:boolean

    @ApiProperty({type:[zFactorsBomDto]})
    zFactorBomDetails:zFactorsBomDto[];

    constructor(
    id:number,
    itemId:number,
    actualIM:string,
    action:ActionEnum,
    geoCode:boolean,
    destination:boolean,
    size:boolean,
    gender:boolean,
    plant:boolean,
    style:boolean,
    zFactorBomDetails:zFactorsBomDto[]

        )
        {
       this.id=id
       this.itemId=itemId    
       this.actualIM=actualIM
       this.action=action
       this.geoCode=geoCode
       this.destination=destination
       this.size=size
       this.gender=gender
       this.plant=plant
       this.style=style
       this.zFactorBomDetails=zFactorBomDetails
    }
}