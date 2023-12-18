import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ContentService } from "./content-service";
import { ContentDto } from "./dto/content-dto";

@ApiTags('content')
@Controller('content')
export class ContentController{
    constructor(
        private readonly contentService :ContentService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/getAllActiveContent')
    async getAllActiveContent(): Promise<CommonResponseModel> {
    try {
        return await this.contentService.getAllActiveContent();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/getAllContent')
    async getAllContent(): Promise<CommonResponseModel> {
    try {
        return await this.contentService.getAllContent();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/createContent')
    @ApiBody({type: ContentDto})
    async createContent(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.contentService.createContent(req, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/updateContent')
    @ApiBody({type: ContentDto})
    async updateContent(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.contentService.createContent(req, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }

    @Post('/activateOrDeactivateContent')
    @ApiBody({type:ContentDto})
    async activateOrDeactivateContent(@Body() Req: any): Promise<CommonResponseModel> {
      console.log(Req,"req comnn")
        try {
            return await this.contentService.activateOrDeactivateContent(Req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFabricContentData')
    async getFabricContentData(): Promise<CommonResponseModel> {
        try {
            return await this.contentService.getFabricContentData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
}