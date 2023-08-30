import { ApiProperty } from "@nestjs/swagger";

export class SizeInfoDto{
    @ApiProperty()
    sizeId: number;

    @ApiProperty()
    size: string;
}   