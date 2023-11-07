import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { SampleRequestService } from './sample-dev-request.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllROSLGroupsResponseModel, AllSampleDevReqResponseModel, CommonResponseModel, ROSLGroupsResponseModel, SampleDevDto, SampleFilterRequest, SampleReqResponseModel, UploadResponse } from '@project-management-system/shared-models';
import { SampleRequestDto } from './dto/samle-dev-req';
import { FileInterceptor } from '@nestjs/platform-express';
import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('sample-request')
@Controller('sample-request')
export class SampleDevReqController {
    constructor(private sampleService: SampleRequestService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}


  @Post('/getAllSampleDevData')
  @ApiBody({type: SampleFilterRequest})
  async getAllSampleDevData(@Body() req?:any): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleDevData(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/getAllSampleReqNo')
  async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleReqNo();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/cancelSampleReqById')
  @ApiBody({type: SampleFilterRequest})
  async cancelSampleReqById(@Body() req : any): Promise<AllSampleDevReqResponseModel> {
    try {
      console.log(req,'controller')
      return await this.sampleService.cancelSampleReqById(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/createSampleDevelopmentRequest')
  @ApiBody({type: SampleRequestDto})
  async createSampleDevelopmentRequest(@Body() req:any):Promise<AllSampleDevReqResponseModel>{
    try{
    return await this.sampleService.createSampleDevelopmentRequest(req)
    }
    catch(err){
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, err);
    }
  }

  @Post('/getAllPCH')
  async getAllPCH(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllPCH();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getAllStyleNo')
  async getAllStyleNo(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllStyleNo();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
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
  async updateStylePath(@UploadedFile() file:any, @Body() uploadData: any): Promise<UploadResponse> {
      console.log(file,'-------file')
      try {
        return await this.sampleService.UpdateFilePath(file.path,file.filename, uploadData.SampleRequestId)
      } catch (error) {
        return this.applicationExceptionHandler.returnException(UploadResponse, error);
      }
    }

    @Post('/getSampleRequestReport')
    async getSampleRequestReport(): Promise<CommonResponseModel> {
      try {
        return await this.sampleService.getSampleRequestReport();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
      }
    }

}
