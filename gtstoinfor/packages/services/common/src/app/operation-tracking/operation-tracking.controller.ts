import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { OperationTrackingService } from "./operation-tracking.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, OperationInventoryDto, OperationInventoryResponseModel, OperationSequenceResponse, OperationTrackingResponseModel, OperationsRequest } from "@project-management-system/shared-models";
import { OperationInvRequest } from "./dto/operation-inventory-req";

@ApiTags('operation-inventory')
@Controller('operation-inventory')
export class OperationIssuingController{
    constructor(
        private operationGroupsService: OperationTrackingService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/getAllOperations')
    // @ApiBody({type: OperationInventoryDto})
    async getOperationinventory(@Body() req:OperationInvRequest): Promise<OperationInventoryResponseModel> {
      try {
        console.log(req,'llllllllllll')
        return await this.operationGroupsService.getOperationinventory(req)
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationInventoryResponseModel, error);
      }
    }
}