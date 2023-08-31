import { ApiProperty } from "@nestjs/swagger";
import { SizeInfoDto } from "./size-info-dto";
import { DestinationDTO } from "../../destination/dto/destination.dto";
import { DestinationInfoDto } from "./destination-info-dto";
import { ColourInfoDto } from "./colour-info-dto";

export class MappingDataDto{
    @ApiProperty()
    size: SizeInfoDto[];

    @ApiProperty()
    destination: DestinationInfoDto[];

    @ApiProperty()
    color: ColourInfoDto[]
}   