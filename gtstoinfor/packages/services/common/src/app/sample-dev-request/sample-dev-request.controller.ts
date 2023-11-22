import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { SampleRequestService } from './sample-dev-request.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllROSLGroupsResponseModel, AllSampleDevReqResponseModel, CommonResponseModel, ProductGroupReq, ROSLGroupsResponseModel, SampleDevDto, SampleFilterRequest, SampleReqResponseModel, SampleRequestFilter, UploadResponse } from '@project-management-system/shared-models';
import { SampleRequestDto } from './dto/samle-dev-req';
import { FileInterceptor } from '@nestjs/platform-express';
import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SampleInventoryLog } from './dto/sample-inventory-log-dto';

@ApiTags('sample-request')
@Controller('sample-request')
export class SampleDevReqController {
  constructor(private sampleService: SampleRequestService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler
  ) { }


  @Post('/getAllSampleDevData')
  @ApiBody({ type: SampleFilterRequest })
  async getAllSampleDevData(@Body() req?: any): Promise<AllSampleDevReqResponseModel> {
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

  @Post('/getAllSampleData')
  async getAllSampleData(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/cancelSampleReqById')
  @ApiBody({ type: SampleFilterRequest })
  async cancelSampleReqById(@Body() req: any): Promise<AllSampleDevReqResponseModel> {
    try {
      console.log(req, 'controller')
      return await this.sampleService.cancelSampleReqById(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/createSampleDevelopmentRequest')
  @ApiBody({ type: SampleRequestDto })
  async createSampleDevelopmentRequest(@Body() req: any): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.createSampleDevelopmentRequest(req)
    }
    catch (err) {
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
  async updateStylePath(@UploadedFile() file: any, @Body() uploadData: any): Promise<UploadResponse> {
    console.log(file, '-------file')
    try {
      return await this.sampleService.UpdateFilePath(file.path, file.filename, uploadData.SampleRequestId)
    } catch (error) {
      return this.applicationExceptionHandler.returnException(UploadResponse, error);
    }
  }

  @Post('/getSampleRequestReport')
  async getSampleRequestReport(@Body() req?:any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getSampleRequestReport(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getFabricCodes')
  async getFabricCodes(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getFabricCodes();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getTrimCodes')
  async getTrimCodes(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimCodes();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getTrimType')
  async getTrimType(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimType();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getTrimCodeAgainstTrimType')
  async getTrimCodeAgainstTrimType(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimCodeAgainstTrimType(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getM3StyleCode')
  async getM3StyleCode(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getM3StyleCode();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getSampleInventory')
  async getSampleInventory(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getSampleInventory();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('getAllRequestNo')
  async getAllRequestNo(): Promise<CommonResponseModel> {
    const data = await this.sampleService.getAllRequestNo()
    return data
  }

  @Post('getAllBuyers')
  async getAllBuyers(): Promise<CommonResponseModel> {
    const data = await this.sampleService.getAllBuyers()
    return data
  }


  @Post('/createSampling')
  @ApiBody({ type: SampleInventoryLog })
  async createSampling(@Req() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.createSampling(req.body)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getAllSmaplingDevData')
  async getAllSmaplingDevData(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllSmaplingDevData()
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
}
