import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
// import { FabricDevelopmentService } from "@project-management-system/shared-services";
import { FabricRequestQualitiesDto } from "./dto/fabric-request-qualities.dto";
import { BuyerExtrnalRefIdReq, BuyerIdReq, CommonResponseModel, FabricDevReqId, FabricDevelopmentRequestResponse, UploadResponse } from "@project-management-system/shared-models";
import { FabricDevelopmentService } from "./fabric-development.services";
import { FabricRequestDto } from "./dto/fabric-request.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FabricApprovalReq } from "./dto/fabric-approval-req";
const util = require('util');
import * as express from 'express';
import * as multer from 'multer';
 

@ApiTags('FabricDevelopment')
@Controller('FabricDevelopment')
export class FabricDevelopmentController {
    constructor(
      private readonly fabricDevelopmentService: FabricDevelopmentService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

     @ApiBody({type:FabricRequestDto})   
    @Post('/createFabricDevelopmentRequest')
  async createFabricDevelopmentRequest(@Body() req:any): Promise<FabricDevelopmentRequestResponse> {
        console.log(req,"controller")
        try {
            return await this.fabricDevelopmentService.createFabricDevelopmentRequest(req, false)
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(FabricDevelopmentRequestResponse, error));
        }
    }  
    @Post('/getFabricDevReqData')
    @ApiBody({type:BuyerExtrnalRefIdReq})
    async getFabricDevReqData(@Body() req?:any): Promise<CommonResponseModel> {
        try {
            return await this.fabricDevelopmentService.getFabricDevReqData(req)
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(CommonResponseModel, error));
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
        if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG)$/)) {
          return callback(new Error('Only png,jpeg,PNG,jpg,JPG,xls,xlsx files are allowed!'), false);
        }
        callback(null, true);
      },
    }))
  
    async updatePath(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
        console.log(file,"file//////////////")
      try {
        return await this.fabricDevelopmentService.updatePath(file.path,file.filename, uploadData.fabricRequestId,uploadData.name)
      } catch (error) {
        return this.applicationExceptionHandler.returnException(UploadResponse, error);
      }
    }

    // @Post('/fileUpload')
    // @ApiConsumes('multipart/form-data')
    // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    //     console.log(files);
    //     }
    // @UseInterceptors(FileInterceptor('file', {
    // //   limits: { files: 1 },
    //   storage: diskStorage({
    //     destination: './upload-files',
    //     filename: (req, file, callback) => {
    //         console.log(file);
    //     //   const name = files.originalname.split('.')[0];
    //     //   const fileExtName = extname(files.originalname);
    //     //   const randomName = Array(4)
    //     //     .fill(null)
    //     //     .map(() => Math.round(Math.random() * 16).toString(16))
    //     //     .join('');
    //     //   callback(null, `${name}-${randomName}${fileExtName}`);
    //     },
    //   }),
    //   fileFilter: (req, file, callback) => {
    //     if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG)$/)) {
    //       return callback(new Error('Only png,jpeg,PNG,jpg,JPG,xls,xlsx files are allowed!'), false);
    //     }
    //     callback(null, true);
    //   },
    // }))
  
    // async fileUpload(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
    //     console.log(file,"file//////////////");
    //   try {
    //     return await this.fabricDevelopmentService.updatePath(file)
    //   } catch (error) {
    //     return this.applicationExceptionHandler.returnException(UploadResponse, error);
    //   }
    // }


    @Post('/fabricApproval')
    @ApiBody({type: FabricApprovalReq})
    async fabricApproval(@Body() req? : any): Promise<CommonResponseModel> {
        try {
            return this.fabricDevelopmentService.fabricApproval(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getAllFabricRequestNo')
    async getAllFabricRequestNo(): Promise<CommonResponseModel> {
        try {
            return this.fabricDevelopmentService.getAllFabricRequestNo();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getAllFabricDevReqQltyData')
    @ApiBody({type : FabricDevReqId})
    async getAllFabricDevReqQltyData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.fabricDevelopmentService.getAllFabricDevReqQltyData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getQltyInfoById')
    @ApiBody({type : FabricDevReqId})
    async getQltyInfoById(@Body() req:any): Promise<CommonResponseModel> {
     try {
            return this.fabricDevelopmentService.getQltyInfoById(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getAllItemsById')
    @ApiBody({type : FabricDevReqId})
    async getAllItemsById(@Body() req:any): Promise<CommonResponseModel> {
     try {
            return this.fabricDevelopmentService.getAllItemsById(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    }