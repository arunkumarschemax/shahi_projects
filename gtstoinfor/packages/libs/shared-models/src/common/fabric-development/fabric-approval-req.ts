import { ApiProperty } from "@nestjs/swagger"
import { QualitiesEnum, StatusEnum } from "@project-management-system/shared-models"

export class FabricApprovalReq{
    fabricRequestId?:number
    requestNo?: string
    quality?: QualitiesEnum

    constructor(
        fabricRequestId?: number,
    requestNo?: string,
    quality?: QualitiesEnum,
    ){
        this.fabricRequestId = fabricRequestId
        this.requestNo = requestNo
        this.quality = quality
    }

}