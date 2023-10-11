import { ApiProperty } from "@nestjs/swagger";
import { FabricQuantitiesInfo, QualitiesEnum } from "@project-management-system/shared-models";

export class FabricRequestQualitiesRequest {
 
    quality: QualitiesEnum;
    placement: string;
    width: number;
    fabricDescription: string;
    description: string;
    qualitiesInfo:FabricQuantitiesInfo[];
    FabricCode?: string;
    fabricRequestQualityId?: number;

    constructor(quality: QualitiesEnum,
        placement: string,
        width: number,
        fabricDescription: string,
        description: string,
        qualitiesInfo:FabricQuantitiesInfo[],
        FabricCode?: string,
        fabricRequestQualityId?: number){
      
        this.quality = quality
        this.placement = placement
        this.width = width
        this.fabricDescription = fabricDescription
        this.description = description
        this.qualitiesInfo = qualitiesInfo
        this.FabricCode = FabricCode
        this.fabricRequestQualityId = fabricRequestQualityId
        

    }


}
