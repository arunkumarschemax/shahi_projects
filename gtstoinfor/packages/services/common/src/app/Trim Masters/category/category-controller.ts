import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CategoryService } from "./category-service";
import { CommonResponseModel } from "@project-management-system/shared-models";

@ApiTags('category')
@Controller('category')
export class categoryController{
    constructor(
        private readonly CategService :CategoryService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/createCategory')
    async createCategory(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.CategService.createCategory(req,false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/updateCategory')
    async updateCategory(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.CategService.createCategory(req,true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/getAllActiveCategory')
    async getAllActiveCategory(): Promise<CommonResponseModel> {
    try {
        return await this.CategService.getAllActiveCategory();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
    @Post('/getAllCategory')
    async getAllCategory(): Promise<CommonResponseModel> {
    try {
        return await this.CategService.getAllCategory();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }
}