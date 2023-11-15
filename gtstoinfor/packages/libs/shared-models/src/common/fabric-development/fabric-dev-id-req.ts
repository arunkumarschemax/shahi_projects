import { QualitiesEnum } from "../../enum"

export class FabricDevReqId{
    fabricRequestId?:number
    fabricRequestQltyId?: number
    fabricRequestQltyInfoId?: number
    quality?: QualitiesEnum
    constructor(
        fabricRequestId?: number,
        fabricRequestQltyId?: number,
        fabricRequestQltyInfoId?: number,
        quality?: QualitiesEnum)
        {
        this.fabricRequestId = fabricRequestId
        this.fabricRequestQltyId = fabricRequestQltyId
        this.fabricRequestQltyInfoId = fabricRequestQltyInfoId
        this.quality = quality
    }

}