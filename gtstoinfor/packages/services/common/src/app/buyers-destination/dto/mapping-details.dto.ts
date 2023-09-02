import { ApiProperty } from "@nestjs/swagger";
import { MappedData } from "packages/libs/shared-models/src/common/Buyers Destination/mapped-data-model";

export class MappingDetailsDto{
    @ApiProperty()
    mappedAgainst: string;

    @ApiProperty()
    mappedData: MappedData[];
}   