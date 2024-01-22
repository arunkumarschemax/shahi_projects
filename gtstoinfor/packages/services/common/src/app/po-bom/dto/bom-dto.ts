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
    constructor(
        itemName:ItemtypeEnum,
        description:string,
        imCode:string,
        itemType:string,
        use:string,
        styleCombo:StyleComboDto[],
        bomId?:number,
        styleId?:number,
        createdUser?: string | null
    ){
        this.itemName=itemName
        this.description=description
        this.imCode=imCode
        this.itemType=itemType
        this.use=use
        this.styleCombo=styleCombo
        this.bomId=bomId
        this.styleId=styleId
        this.createdUser=createdUser
    }


}