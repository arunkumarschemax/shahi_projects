import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { OperationTrackingService } from "./operation-tracking.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, OperationInventoryResponseModel, OperationInventoryDto, OperationSequenceResponse, OperationTrackingResponseModel, OperationsRequest, TabNameReq } from "@project-management-system/shared-models";
import { OperationTrackingDto } from "./dto/operation-tracking-dto";
import { OperationInvRequest } from "./dto/operation-inventory-req";
import { OperationInventoryRepository } from "./repo/operation-inventory-repository";

@ApiTags('operation-inventory')
@Controller('operation-inventory')
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

    @Post('/getOperationInventoryData')
    @ApiBody({type: TabNameReq})
    async getOperationInventoryData(@Body() req: any): Promise<OperationInventoryResponseModel> {
      try {
        return await this.operationGroupsService.getOperationInventoryData(req)
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationInventoryResponseModel, error);
      }
    }
    @Post('/getOperationInverntory')
    @ApiBody({type:OperationsRequest })
    async getOperationInverntory(@Body() req:any): Promise<any> {
      console.log(req,'022222222222222222');
      
        try {
            return await this.operationGroupsService.getOperationInverntory(req)
        } catch (error) {
            return this.applicationExceptionHandler.returnException(OperationInventoryResponseModel, error);
        }
    }
}