import { ApiProperty } from "@nestjs/swagger";
import { BomDto } from "./bom-dto";

export class StyleDto {
   @ApiProperty()
    style:string

    @ApiProperty()
    styleName:string

    @ApiProperty()
    season:string

    @ApiProperty()
    expNo:string
   
    @ApiProperty({type:[BomDto]})
    bomdto:BomDto[]

    @ApiProperty()
    styleId:number
    constructor(
        style:string,
        styleName:string,
        season:string,
        expNo:string,
        bomdto:BomDto[],
        styleId?:number 
        )
        {
            this.style=style
            this.styleName=styleName
            this.season=season
            this.expNo=expNo
            this.bomdto=bomdto
            this.styleId=styleId
    }
}