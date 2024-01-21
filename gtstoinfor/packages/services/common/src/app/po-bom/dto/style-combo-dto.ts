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

}