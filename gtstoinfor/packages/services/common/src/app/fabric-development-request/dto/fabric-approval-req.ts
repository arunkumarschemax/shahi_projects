import { ApiProperty } from "@nestjs/swagger"
import { FabricRequestQualitiesEntity } from "../fabric-request-qualities.entity"
import { QualitiesEnum, StatusEnum, SubContractStatus } from "@project-management-system/shared-models"

export class FabricApprovalReq{
    @ApiProperty()
    fabricRequestId?: number
    @ApiProperty()
    requestNo?: string
    @ApiProperty()
    quality?: QualitiesEnum
    @ApiProperty()
    isApproved?: SubContractStatus

    constructor(
    fabricRequestId?: number,
    requestNo?: string,
    quality?: QualitiesEnum,
    isApproved ?: SubContractStatus
    ){
        this.fabricRequestId = fabricRequestId
        this.requestNo = requestNo
        this.quality = quality
        this.isApproved = isApproved
    }

}