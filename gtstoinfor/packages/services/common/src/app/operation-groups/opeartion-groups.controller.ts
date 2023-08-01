import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OperationGroupsService } from "./operation-groups.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { OperationGroupsDto } from "./dto/operation-groups.dto";
import { AllOperationGroupsResponseModel, OperationGroupsResponseModel } from "@project-management-system/shared-models";
import { OperationGroupsRequest } from "./dto/operation-groups.req";

@ApiTags('OperationGroups')
@Controller('operationgroups')
export class OperationGroupsController{
    constructor(
        private operationGroupsService: OperationGroupsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/createOperationGroup')
    async createOperationGroup(@Body() operationGroupDto:any): Promise<OperationGroupsResponseModel> {
    try {
        return await this.operationGroupsService.createOperationGroup(operationGroupDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationGroupsResponseModel, error);
      }
    }

    @Post('/updateOperationGroup')
    async updateOperationGroup(@Body() operationGroupDto:any): Promise<OperationGroupsResponseModel> {
    try {
        return await this.operationGroupsService.createOperationGroup(operationGroupDto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationGroupsResponseModel, error);
      }
    }

    @Post('/getAllOperationGroups')
    async getAllOperationGroups(@Body() req:any): Promise<AllOperationGroupsResponseModel> {
    try {
        return await this.operationGroupsService.getAllOperationGroups(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllOperationGroupsResponseModel, error);
      }
    }

    @Post('/getAllActiveOperationGroups')
    async getAllActiveOperationGroups(): Promise<AllOperationGroupsResponseModel> {
    try {
        return await this.operationGroupsService.getAllActiveOperationGroups();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllOperationGroupsResponseModel, error);
      }
    }

    @Post('/activateOrDeactivateOperationGroup')
    async activateOrDeactivateOperationGroup(@Body() operationReq: any): Promise<OperationGroupsResponseModel> {
    try {
        return await this.operationGroupsService.activateOrDeactivateOperationGroup(operationReq);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationGroupsResponseModel, error);
      }
    }

    @Post('/getActiveOperationGroupById')
    async getActiveOperationGroupById(@Body() operationReq: any): Promise<OperationGroupsResponseModel> {
    try {
        return await this.operationGroupsService.getActiveOperationGroupById(operationReq);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(OperationGroupsResponseModel, error);
      }
    }



}