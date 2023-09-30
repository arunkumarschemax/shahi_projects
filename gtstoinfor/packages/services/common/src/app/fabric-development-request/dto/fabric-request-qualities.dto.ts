import { ApiProperty } from "@nestjs/swagger";
import { QualitiesEnum } from "@project-management-system/shared-models";
import { FabricRequestQualitiesInfoDto } from "./fabric-request-quality-info.dto";
import { FabricRequestItemsDto } from "./fabric-request-items.dto";

export class FabricRequestQualitiesDto {

    // createdAt : Date;

    // @ApiProperty()
    // createdUser : string;
  
    // updatedAt : Date;

    // @ApiProperty()
    // updatedUser : string;
  
    // @ApiProperty()
    // versionFlag : number;
    
    @ApiProperty()
    Quality: QualitiesEnum;

    @ApiProperty()
    placement: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    FabricDescription: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    FabricCode: string;

    @ApiProperty({type:[FabricRequestQualitiesInfoDto]})
    qualitiesInfo:FabricRequestQualitiesInfoDto[];

  

    @ApiProperty()
    fabricRequestQualityId?: number;


}
