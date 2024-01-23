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

    
    @ApiProperty()
    msc:string

    
    @ApiProperty()
    factoryLo:string

    
    @ApiProperty()
    status:string
   
    @ApiProperty({type:[BomDto]})
    bomdto:BomDto[]

    @ApiProperty()
    styleId:number
    
    constructor(
        style:string,
        styleName:string,
        season:string,
        expNo:string,
        msc:string,
        factoryLo:string,
        status:string,
        bomdto:BomDto[],
        styleId?:number 
        )
        {
            this.style=style
            this.styleName=styleName
            this.season=season
            this.expNo=expNo
            this.msc=msc
            this.factoryLo=factoryLo
            this.status=status
            this.bomdto=bomdto
            this.styleId=styleId
    }
}