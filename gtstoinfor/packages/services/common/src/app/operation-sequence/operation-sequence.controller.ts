import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OperationSequenceService } from "./operation-sequence.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, OperationSequenceResponse } from "@project-management-system/shared-models";

@ApiTags('operationsequence')
@Controller('operationsequence')
export class OperationSequenceController{
    constructor(
        private operationGroupsService: OperationSequenceService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/createOperationSequence')
    async createOperationSequence(@Body() req:any): Promise<OperationSequenceResponse> {
    try {
        return await this.operationGroupsService.createOperationSequence(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationSequenceResponse, error);
      }
    }

    @Post('/getInfoByItemCode')
    async getInfoByItemCode(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.operationGroupsService.getInfoByItemCode(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }

    @Post('/getOperationSequenceInfo')
    async getOperationSequenceInfo(): Promise<CommonResponseModel> {
    try {
        return await this.operationGroupsService.getOperationSequenceInfo();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }

    @Post('/getOperationSequenceInfoByItemCode')
    async getOperationSequenceInfoByItemCode(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.operationGroupsService.getOperationSequenceInfoByItemCode(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
}