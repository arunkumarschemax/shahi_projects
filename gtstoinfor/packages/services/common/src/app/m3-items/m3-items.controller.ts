import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, M3Itemsfilter, UploadResponse } from "@project-management-system/shared-models";
import { M3ItemsService } from "./m3-items.service";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3TrimItemsDTO } from "./m3-trim-items.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";



@ApiTags('m3Items')
@Controller('/m3Items')
export class M3ItemsController {
  constructor(private readonly Service: M3ItemsService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }




  @Post('createM3Items')
  @ApiBody({type:M3ItemsDTO})
  async createM3Items(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createM3Items(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('/getM3Items')
  @ApiBody({type:M3Itemsfilter})
  async getM3Items(@Body()req:any): Promise<CommonResponseModel> {
    console.log(req,"req controller");
    
    const data=await this.Service.getM3Items(req)
    return  data
}

@Post('/getM3FabricsByBuyer')
  async getM3FabricsByBuyer(@Body() req: any): Promise<CommonResponseModel> {
    console.log(req,'$$$$$$$$$$$$$$$$$')
    const data=await this.Service.getM3FabricsByBuyer(req)
    return  data
}

@Post('createM3Trim')
  @ApiBody({type:M3TrimItemsDTO})
  async createM3Trim(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createM3Trim(createDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

@Post('getFabricTypes')
  async getFabricTypes(): Promise<CommonResponseModel> {
    try {
      return await this.Service.getFabricTypes();
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

@Post('getFabricWeaves')
  async getFabricWeaves(): Promise<CommonResponseModel> {
    try {
      return await this.Service.getFabricWeaves();
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

@Post('getFabricFinishes')
  async getFabricFinishes(): Promise<CommonResponseModel> {
    try {
      return await this.Service.getFabricFinishes();
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('createKnittedFabric')
  async createKnittedFabric(@Body() req:any): Promise<CommonResponseModel> {
    try {
      return await this.Service.createKnittedFabric(req);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
    }
  }

  @Post('getKnittedFabric')
  async getKnittedFabric(): Promise<CommonResponseModel> {
    try {
      return await this.Service.getKnittedFabric();
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
    async updateFabricPath(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
        console.log(file,'-------file')
        try {
          return await this.Service.updateFabricPath(file.path,file.filename, uploadData.m3ItemId)
        } catch (error) {
          return this.applicationExeptionhandler.returnException(UploadResponse, error);
        }
      }

}

function diskStorage(arg0: {
  destination: any;
  // destination: './upload_files',
  filename: (req: any, file: any, callback: any) => void;
}): any {
  throw new Error("Function not implemented.");
}
