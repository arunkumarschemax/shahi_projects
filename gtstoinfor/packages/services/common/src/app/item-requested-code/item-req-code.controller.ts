import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel, FabricCodeReq, M3TrimType, M3trimsDTO, TrimCodeReq } from '@project-management-system/shared-models';
import { FabricReqCodeService } from './fabric-request-code.service';
import { TrimReqCodeService } from './trim-req-code.service';
import { TrimRequestCodeDto } from './dtos/trim-request-code.dto';

@ApiTags('item-req-code')
@Controller('item-req-code')
export class ItemReqCodeController {
    constructor(
        private fabReqService: FabricReqCodeService,
        private trimReqService : TrimReqCodeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      /**
     * creates  a Item Category
     * @param ItemCategory Item Category DTO
     * @returns Item CategoryResponse
     */
    @Post('/createFabricRequestedCode')
    @ApiBody({type: FabricRequestCodeDto})
    async createFabricRequestedCode(@Body() req?:any): Promise<CommonResponseModel> {
        try {
         return await this.fabReqService.createFabricRequestedCode(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }

    @Post('/getAllFabrics')
    @ApiBody({type:FabricCodeReq})
    async getAllFabrics(@Body() req?:any): Promise<CommonResponseModel> {
        try {
         return await this.fabReqService.getAllFabrics(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }
    
    @Post('/createTrimRequestedCode')
    @ApiBody({type: TrimRequestCodeDto})
    async createTrimRequestedCode(@Body() req?:any): Promise<CommonResponseModel> {
        try {
         return await this.trimReqService.createTrimRequestedCode(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }

    @Post('/getAllTrims')
    @ApiBody({type:TrimCodeReq})
    async getAllTrims(@Body() req?: any): Promise<CommonResponseModel> {
        try {
         return await this.trimReqService.getAllTrims(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }

     @Post('/getAllTypes')
@ApiBody({type:M3trimsDTO})
async getAllTypes(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllTypes(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllContents')
@ApiBody({type:M3trimsDTO})
async getAllContents(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllContents(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllFinishes')
@ApiBody({type:M3trimsDTO})
async getAllFinishes(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllFinishes(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllHoles')
@ApiBody({type:M3trimsDTO})
async getAllHoles(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllHoles(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllStructures')
@ApiBody({type:M3trimsDTO})
async getAllStructures(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllStructures(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllCategories')
@ApiBody({type:M3trimsDTO})
async getAllCategories(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllCategories(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllQuality')
@ApiBody({type:M3trimsDTO})
async getAllQuality(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllQuality(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllThickness')
@ApiBody({type:M3trimsDTO})
async getAllThickness(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllThickness(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllVariety')
@ApiBody({type:M3trimsDTO})
async getAllVariety(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllVariety(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllUom')
@ApiBody({type:M3trimsDTO})
async getAllUom(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllUom(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllColors')
@ApiBody({type:M3trimsDTO})
async getAllColors(@Body() req?: any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllColors(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllTrimCategories')
@ApiBody({type:M3TrimType})
async getAllTrimCategories(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllTrimCategories(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllBuyers')
async getAllBuyers(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    return await this.trimReqService.getAllBuyers(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getContents')
async getContents(): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.getContents();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllWeaves')
async getAllWeaves(): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.getAllWeaves();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllHSNCodes')
async getAllHSNCodes(): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.getAllHSNCodes();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllFinish')
async getAllFinish(): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.getAllFinish();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllFabricTypes')
async getAllFabricTypes(): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.getAllFabricTypes();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/getAllFabricBuyers')
async getAllFabricBuyers(): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.getAllFabricBuyers();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}

@Post('/updateFabStatus')
async updateFabStatus(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    return await this.fabReqService.updateFabStatus(req.id);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}
@Post('/updateTrimStatus')
async updateTrimStatus(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    console.log(req);
    return await this.fabReqService.updateTrimStatus(req.id);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
  }
}


}
