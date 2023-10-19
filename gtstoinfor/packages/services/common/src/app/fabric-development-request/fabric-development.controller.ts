import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
// import { FabricDevelopmentService } from "@project-management-system/shared-services";
import { FabricRequestQualitiesDto } from "./dto/fabric-request-qualities.dto";
import { CommonResponseModel, FabricDevelopmentRequestResponse, UploadResponse } from "@project-management-system/shared-models";
import { FabricDevelopmentService } from "./fabric-development.services";
import { FabricRequestDto } from "./dto/fabric-request.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FabricApprovalReq } from "./dto/fabric-approval-req";


 

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
    async getFabricDevReqData(): Promise<CommonResponseModel> {
        try {
            return await this.fabricDevelopmentService.getFabricDevReqData()
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

    }