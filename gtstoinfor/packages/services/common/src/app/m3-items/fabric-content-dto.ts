import { ApiProperty } from '@nestjs/swagger';

export class FabricContentDto {

    @ApiProperty()
    fabricContentId: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    percentage: number;

    @ApiProperty()
    createdUser: string | null;

    @ApiProperty()
    updatedUser: string | null;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;

    @ApiProperty()
    versionFlag: number;


}

