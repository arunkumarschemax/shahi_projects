import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import {  CommonResponseModel, M3TrimType, M3trimsDTO, UploadResponse } from "@project-management-system/shared-models";
import { M3TrimsDTO } from "./m3-trims.dto";
import { M3TrimsService } from "./m3-trims.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { diskStorage } from 'multer';

@ApiTags('m3Trims')
@Controller('/m3trims')
export class M3TrimsController {
  constructor(private readonly Service: M3TrimsService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }

  @Post('createM3Trims')
  @ApiBody({type:M3TrimsDTO})
  async createM3Trims(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      // console.log(createDto,',-,--,-,-,--,-,-,-,,--,-,-,-,')
      return await this.Service.createM3Trims(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('/getM3Trims')
  async getM3Trims(): Promise<CommonResponseModel> {
    try {
      return await this.Service.getM3Trims();
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
}

@Post('/getM3TrimsByBuyer')
async getM3TrimsByBuyer(@Body() req: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getM3TrimsByBuyer(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getM3TrimsByTrimCode')
async getM3TrimsByTrimCode(@Body() req: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getM3TrimsByTrimCode(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllM3Data')
@ApiBody({type:M3trimsDTO})
async getAllM3Data(@Body() req: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllM3Data(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllTypes')
@ApiBody({type:M3trimsDTO})
async getAllTypes(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllTypes(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllContents')
@ApiBody({type:M3trimsDTO})
async getAllContents(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllContents(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllFinishes')
@ApiBody({type:M3trimsDTO})
async getAllFinishes(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllFinishes(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllHoles')
@ApiBody({type:M3trimsDTO})
async getAllHoles(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllHoles(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllStructures')
@ApiBody({type:M3trimsDTO})
async getAllStructures(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllStructures(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllCategories')
@ApiBody({type:M3trimsDTO})
async getAllCategories(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllCategories(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllQuality')
@ApiBody({type:M3trimsDTO})
async getAllQuality(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllQuality(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllThickness')
@ApiBody({type:M3trimsDTO})
async getAllThickness(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllThickness(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllVariety')
@ApiBody({type:M3trimsDTO})
async getAllVariety(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllVariety(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllUom')
@ApiBody({type:M3trimsDTO})
async getAllUom(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllUom(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllColors')
@ApiBody({type:M3trimsDTO})
async getAllColors(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllColors(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllTrimCategories')
@ApiBody({type:M3TrimType})
async getAllTrimCategories(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllTrimCategories(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllBuyers')
async getAllBuyers(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllBuyers(req);
  } catch (error) {
    return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
  }
}


@Post('/fileUpload')
@ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
      limits: { files: 1 },
      storage: diskStorage({
        destination : join(__dirname, '../../../../',`upload_files`),

          // destination: './upload_files',
          filename: (req, file, callback) => {
              console.log(file.originalname);
              const name = file.originalname;
              callback(null, `${name}`);
          },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
          return callback(new Error('Only png,jpeg,PNG,jpg,gif,tiff,x-tiff,z-png files are allowed!'), false);
        }
        callback(null, true);
      },
  }))
  async updateTrimPath(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
      console.log(file,'-------file')
      try {
        return await this.Service.updateTrimPath(file.path,file.filename, uploadData.m3TrimId)
      } catch (error) {
        return this.applicationExeptionhandler.returnException(UploadResponse, error);
      }
    }

}