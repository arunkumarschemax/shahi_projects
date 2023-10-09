import { ApiProperty } from "@nestjs/swagger";
import { FabricQuantitiesInfo, QualitiesEnum } from "@project-management-system/shared-models";

export class FabricRequestQualitiesRequest {
 
    Quality: QualitiesEnum;
    placement: string;
    width: number;
    FabricDescription: string;
    description: string;
    qualitiesInfo:FabricQuantitiesInfo[];
    FabricCode?: string;
    fabricRequestQualityId?: number;

    constructor(Quality: QualitiesEnum,
        placement: string,
        width: number,
        FabricDescription: string,
        description: string,
        qualitiesInfo:FabricQuantitiesInfo[],
        FabricCode?: string,
        fabricRequestQualityId?: number){
      
        this.Quality = Quality
        this.placement = placement
        this.width = width
        this.FabricDescription = FabricDescription
        this.description = description
        this.qualitiesInfo = qualitiesInfo
        this.FabricCode = FabricCode
        this.fabricRequestQualityId = fabricRequestQualityId
        

    }


}
