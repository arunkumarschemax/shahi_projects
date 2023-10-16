import { ApiProperty } from "@nestjs/swagger";
import { QualitiesEnum } from "@project-management-system/shared-models";
import { FabricRequestQualitiesInfoDto } from "./fabric-request-quality-info.dto";
import { FabricRequestItemsDto } from "./fabric-request-items.dto";

export class FabricRequestQualitiesDto {


    @ApiProperty()
    quality: QualitiesEnum;

    @ApiProperty()
    placement: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    fabricDescription: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    fabricCode: string;

    @ApiProperty({type:[FabricRequestQualitiesInfoDto]})
    qualitiesInfo:FabricRequestQualitiesInfoDto[];

    @ApiProperty()
    fabricRequestId: number;



}
