import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from 'libs/backend-utils';

import { AllHMStyleResponseModel, CommonResponseModel, HMStylesModelDto } from '@project-management-system/shared-models';
import { ZFactorServices } from './z-factors-service';
import { zFactorsDto } from './dto/z-factors-dto';



@ApiTags('z-factors')
@Controller('z-factors-controller')

export class ZfactorsController {
    constructor(private zFactorService: ZFactorServices,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler) { }




    @Post('/getGeoCode')
    async getGeoCode():Promise<CommonResponseModel>{
        try{
            return this.zFactorService.getGeoCode()
        }
        catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
      }

    @Post('/getPlantCode')
    async getPlantCode():Promise<CommonResponseModel> {
        try{
            return this.zFactorService.getPlantCode()
        }
        catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
     }
     
    @ApiBody({type:zFactorsDto})
    @Post('/createZFactors')
    async createZFactors(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.zFactorService.createZFactors(req)
        }
        catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

}