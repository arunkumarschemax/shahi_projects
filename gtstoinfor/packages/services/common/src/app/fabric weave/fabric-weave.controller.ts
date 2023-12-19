import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { FabriCWeaveDto } from './dto/fabric-weave.dto';
import { FabricWeaveService } from './fabric-weave.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllFabricWeaveResponseModel, CommonResponseModel, FabricTypeIdReq, FabricWeaveResponseModel, UploadResponse, fabricTypeIdreq } from '@project-management-system/shared-models';
import { FabricWeaveRequest } from './dto/fabric-weave-request';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';


@ApiTags('fabric-weave')
@Controller('fabric-weave')
export class FabricWeaveController {
    constructor(private service: FabricWeaveService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createFabricWeave')
    @ApiBody({type:FabriCWeaveDto})
    async createFabricWeave(@Body() req:any): Promise<CommonResponseModel> {
    try {
        return await this.service.createFabricWeave(req, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
    }
  
    @Post('/updateFabricWeave')
    @ApiBody({type: FabriCWeaveDto})
    async updateFabricWeave(@Body() dto: any): Promise<FabricWeaveResponseModel> {
      try {
        return await this.service.createFabricWeave(dto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(FabricWeaveResponseModel, error);
      }
    }


  @Post('/getAllFabricWeave')
  async getAllFabricWeave(): Promise<AllFabricWeaveResponseModel> {
    try {
      return await this.service.getAllFabricWeave();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllFabricWeaveResponseModel, error);
    }
  }

  @Post('/getAllActiveFabricWeave')
  async getAllActiveFabricWeave(): Promise<AllFabricWeaveResponseModel> {
    try {
      return await this.service.getAllActiveFabricWeave();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllFabricWeaveResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateFabricWeave')
  @ApiBody({type: FabricWeaveRequest})
  async activateOrDeactivateFabricWeave(@Body() req: any): Promise<FabricWeaveResponseModel> {
    try {
      return await this.service.activateOrDeactivateFabricWeave(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(FabricWeaveResponseModel, error);
    }
  }

  @Post('/getWeaveByTypeId')
  @ApiBody({type: FabricTypeIdReq})
  async getWeaveByTypeId(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.service.getWeaveByTypeId(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getActiveFabricWeaveById')
  async getActiveFabricWeaveById(@Body() req: FabricWeaveRequest ): Promise<FabricWeaveResponseModel> {
      try {
          return await this.service.getActiveFabricWeaveById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(FabricWeaveResponseModel, err);
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

  async fabricWeaveImageUpload(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
    console.log(file,'-------file')
    console.log(uploadData,'uploaddata')
    try {
      return await this.service.updatePath(file.path,file.filename, uploadData.fabricWeaveId)
    } catch (error) {
      return this.applicationExceptionHandler.returnException(UploadResponse, error);
    }
  }

  
}
