import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from 'libs/backend-utils';

import { AllHMStyleResponseModel, CommonResponseModel, HMStylesModelDto, ZFactorReq } from '@project-management-system/shared-models';
import { ZFactorServices } from './z-factors-service';




@ApiTags('z-factors')
@Controller('z-factors-controller')

export class ZfactorsController {
  constructor(private zFactorService: ZFactorServices,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler) { }
   
    @Post('/getImCode')
    async getImCode(req:ZFactorReq):Promise<CommonResponseModel>{
        try{
            return this.zFactorService.getImCode(req)
        }
        catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
      }
       
    @Post('/getAllItems')
    async getAllItems():Promise<CommonResponseModel>{
        try{
            return this.zFactorService.getAllItems()
        }
        catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
      }
   
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
    async getPlantCode():Promise<CommonResponseModel>{
        try{
            return this.zFactorService.getPlantCode()
        }
        catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
      }
 
}