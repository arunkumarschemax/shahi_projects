import { ApiProperty } from "@nestjs/swagger";
import { ItemtypeEnum } from "@project-management-system/shared-models";
import { StyleComboDto } from "./style-combo-dto";

export class DestinationDto {
    @ApiProperty()
    destinationId:number

    @ApiProperty()
    countryCode:string

    @ApiProperty()
    geoCode:string

    @ApiProperty()
    createdUser: string | null;
    constructor(
    destinationId:number,
    countryCode:string,
    geoCode:string,
        createdUser?: string | null
    ){
       this.destinationId=destinationId
       this.countryCode=countryCode
       this.geoCode=geoCode
        this.createdUser=createdUser
    }


}