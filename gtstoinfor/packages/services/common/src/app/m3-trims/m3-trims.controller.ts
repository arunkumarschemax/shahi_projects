import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BuyerIdReq, CommonResponseModel, M3TrimTypeRequest, M3trimsDTO } from "@project-management-system/shared-models";
import { M3TrimsDTO } from "./m3-trims.dto";
import { M3TrimsService } from "./m3-trims.service";

@ApiTags('m3Trims')
@Controller('/m3trims')
export class M3TrimsController {
  constructor(private readonly Service: M3TrimsService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler) { }

  @Post('createM3Trims')
  @ApiBody({type:M3TrimsDTO})
  async createM3Trims(@Body() createDto: any): Promise<CommonResponseModel> {
    try {
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
async getAllTrimCategories(): Promise<CommonResponseModel> {
  try {
    return await this.Service.getAllTrimCategories();
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


}