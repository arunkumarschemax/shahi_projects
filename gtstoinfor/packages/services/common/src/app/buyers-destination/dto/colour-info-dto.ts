import { ApiProperty } from "@nestjs/swagger";

export class ColourInfoDto{
    @ApiProperty()
    colourId: number;

    @ApiProperty()
    colourName: string;
}   