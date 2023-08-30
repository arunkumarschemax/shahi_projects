import { ApiProperty } from "@nestjs/swagger";

export class DestinationInfoDto{
    @ApiProperty()
    destinationId: number;

    @ApiProperty()
    destinationName: string;
}   