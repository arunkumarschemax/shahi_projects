import { Body, Controller, Post,Get, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CentricDto } from "./dto/centric.dto";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { CommonResponseModel } from "packages/libs/shared-models/src/common/global-response-object";
import { CentricService } from "./centric.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'
import { PoOrderFilter } from "@project-management-system/shared-models";


@ApiTags("/centric")
@Controller("/centric-orders")
export class CentricController {
  constructor(
    private readonly Service: CentricService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler

  ) { }

  @Post("/saveCentricOrder")
  @ApiBody({type:CentricDto})
  async saveCentricOrder(@Body() req: any): Promise<CommonResponseModel> {
    console.log(req,"post")
    try {
      return await this.Service.saveCentricOrder(req);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(
        CommonResponseModel,
        error
      );
    }
  }

  @Post('/fileUpload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
      limits: { files: 1 },
      storage: diskStorage({
          destination: './upload-files',
          filename: (req, file, callback) => {
              console.log(file.originalname);
              const name = file.originalname;
              callback(null, `${name}`);
          },
      }),
      fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(pdf)$/)) {
              return callback(new Error('Only pdf files are allowed!'), false);
          }
          callback(null, true);
      },
  }))
  
  async fileUpload(@UploadedFile() file, PoNumber: string): Promise<CommonResponseModel> {
    try {
        return await this.Service.updatePath(file.path, file.filename, file.mimetype)
    } catch (error) {
        return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
    }
}

   @Post('/getorderData')
    @ApiBody({ type: PoOrderFilter })
    async getorderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }



@Post('/getPdfFileInfo')
async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
        return this.Service.getPdfFileInfo();
    } catch (err) {
        return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
    }
}


@Post('/getPoNumber')
async getPoNumber(): Promise<CommonResponseModel> {
    try {
        return this.Service.getPoNumber();
    } catch (err) {
        return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
    }
}


 

}