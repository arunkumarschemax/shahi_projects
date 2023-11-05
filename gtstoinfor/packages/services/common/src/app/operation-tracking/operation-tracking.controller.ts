import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { OperationTrackingService } from "./operation-tracking.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, OperationInventoryResponseModel, OperationSequenceResponse } from "@project-management-system/shared-models";
import { OperationTrackingDto } from "./dto/operation-tracking-dto";

@ApiTags('operation-tracking')
@Controller('operation-tracking')
export class OperationIssuingController{
    constructor(
        private operationGroupsService: OperationTrackingService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/createOperationReporting')
    @ApiBody({type: OperationTrackingDto})
    async createOperationReporting(@Body() req:any): Promise<OperationInventoryResponseModel> {
    try {
        return await this.operationGroupsService.createOperationReporting(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationInventoryResponseModel, error);
      }
    }
}