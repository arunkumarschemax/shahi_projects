import { ApiProperty } from "@nestjs/swagger";
import { ItemtypeEnum } from "@project-management-system/shared-models";
import { StyleComboDto } from "./style-combo-dto";

export class BomDto {
    @ApiProperty()
    styleId:number

    @ApiProperty()
    itemName:ItemtypeEnum

    @ApiProperty()
    description:string

    @ApiProperty()
    imCode:string

    @ApiProperty()
    itemType:string

    @ApiProperty()
    use:string

    @ApiProperty({type:[StyleComboDto]})
    styleCombo:StyleComboDto[];

    @ApiProperty()
    bomId:number

    @ApiProperty()
    createdUser: string | null;


}