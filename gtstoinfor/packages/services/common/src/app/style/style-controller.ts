import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllStyleResponseModel, CommonResponseModel, StyleIdReq, UploadResponse, buyerReq } from "@project-management-system/shared-models";
import { StyleService } from "./style-service";
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BuyerRequest } from "./dto/buyer.request";
import { type } from "os";
import { StyleReq } from "./dto/style-dto";

@ApiTags('style')
@Controller('style')
export class StyleController{
    constructor(
        private readonly styleService :StyleService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/creteStyle')
    @ApiBody({ type: StyleReq })
    async creteStyle(@Body() dto:any,isUpdate:boolean=false): Promise<AllStyleResponseModel> {
      console.log(dto,"cont")
    try {
        return await this.styleService.creteStyle(dto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllStyleResponseModel, error);
      }
    }


    @Post('/fileUpload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
      limits: { files: 1 },
      storage: diskStorage({
        destination: './upload-files',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
          return callback(new Error('Only png,jpeg,PNG,jpg,gif,tiff,x-tiff,z-png files are allowed!'), false);
        }
        callback(null, true);
      },
    }))
    async updateStylePath(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
        console.log(file,'-------file')
        try {
          return await this.styleService.updateStylePath(file.path,file.filename, uploadData.styleId)
        } catch (error) {
          return this.applicationExceptionHandler.returnException(UploadResponse, error);
        }
      }

    @Post('/ActivateOrDeactivateStyle')
    async ActivateOrDeactivateStyle(@Body() dto:any,isUpdate:boolean=false): Promise<AllStyleResponseModel> {
    try {
        return await this.styleService.ActivateOrDeactivateStyle(dto);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllStyleResponseModel, error);
      }
    }

    
    @Post('/getAllStyle')
    async getAllStyle(@Body() buyerReq:any):Promise<AllStyleResponseModel>{
      try{
        console.log(buyerReq)
        return await this.styleService.getAllStyle(buyerReq)
      }catch(error){
        return this.applicationExceptionHandler.returnException(AllStyleResponseModel,error)
      }
    }

    @Post('/getAllActiveStyle')
    async getAllActiveStyle():Promise<AllStyleResponseModel>{
      try{
        return await this.styleService.getAllActiveStyle()
      }catch(error){
        return this.applicationExceptionHandler.returnException(AllStyleResponseModel,error)
      }
    }

    @Post('/updateStyle')
    async updateStyle(@Body() dto: any,@Req() request:Request): Promise<AllStyleResponseModel> {
      try {
        return await this.styleService.creteStyle(dto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllStyleResponseModel, error);
      }
    }


    @Post('/getstyleaginstpch')
    @ApiBody({type:StyleIdReq})
    async getstyleaginstpch(@Body() req:any): Promise<CommonResponseModel> {
      try {
        return await this.styleService.getstyleaginstpch(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }

}