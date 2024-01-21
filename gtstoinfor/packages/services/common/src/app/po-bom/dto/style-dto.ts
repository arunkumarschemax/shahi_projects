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
}