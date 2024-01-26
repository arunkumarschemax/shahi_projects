import { ApiProperty } from "@nestjs/swagger";

export class StyleComboDto {

    @ApiProperty()
    styleId:number

    @ApiProperty()
    bomId:number

    @ApiProperty()
    combination:string

    @ApiProperty()
    primaryColor:string

    @ApiProperty()
    secondaryColor:string
    
    @ApiProperty()
    logoColor:string

    @ApiProperty()
    createdUser: string | null;

    @ApiProperty()
    styleComboid: number;
    constructor(
        combination:string,
        primaryColor:string,
        secondaryColor:string,
        logoColor:string,
        createdUser?: string | null,
        styleComboid?: number,
        styleId?:number,
        bomId?:number,
    ){
        this.combination=combination
        this.primaryColor=primaryColor
        this.secondaryColor=secondaryColor
        this.logoColor=logoColor
        this.createdUser=createdUser
        this.styleComboid=styleComboid
        this.styleId=styleId
        this.bomId=bomId
    }

}