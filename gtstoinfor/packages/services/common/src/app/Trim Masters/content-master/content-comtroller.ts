import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ContentService } from "./content-service";

@ApiTags('content')
@Controller('content')
export class ContentController{
    constructor(
        private readonly contentService :ContentService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/getAllActiveCategory')
    async getAllActiveCategory(): Promise<CommonResponseModel> {
    try {
        return await this.contentService.getAllActiveContent();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/getAllCategory')
    async getAllCategory(): Promise<CommonResponseModel> {
    try {
        return await this.contentService.getAllContent();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/createContent')
    async createContent(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.contentService.createContent(req, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/updateContent')
    async updateContent(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.contentService.createContent(req, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
}