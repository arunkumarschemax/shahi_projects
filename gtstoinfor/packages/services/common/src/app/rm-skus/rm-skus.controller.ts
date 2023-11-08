import { Controller,Post,Body } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { RmSkusService } from "./rm-skus.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, RMSkuFilterReq, RmSkuResponseModel } from "@project-management-system/shared-models";

@ApiTags('RMSkus')
@Controller('rm-skus')
export class RmSkusController {
    constructor(
        private rmSkuService: RmSkusService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createRmSku')
    async createRmSku(@Body() req:any):Promise<RmSkuResponseModel>{
        try{
            return await this.rmSkuService.createRmSkus(req)
        }catch(err){
            return this.applicationExceptionhandler.returnException(RmSkuResponseModel,err)
        }
    }

    @Post('/getAllRmSKUs')
    @ApiBody({type: RMSkuFilterReq})
    async getAllRmSKUs(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.rmSkuService.getAllRmSKUs(req)
        }catch(err){
            return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getSKUCodeData')
    async getSKUCodeData():Promise<CommonResponseModel>{
        try{
            return await this.rmSkuService.getSKUCodeData()
        }catch(err){
            return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getFeatureCodeData')
    async getFeatureCodeData():Promise<CommonResponseModel>{
        try{
            return await this.rmSkuService.getFeatureCodeData()
        }catch(err){
            return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getItemCodeData')
    async getItemCodeData():Promise<CommonResponseModel>{
        try{
            return await this.rmSkuService.getItemCodeData()
        }catch(err){
            return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getOptionValueData')
    async getOptionValueData():Promise<CommonResponseModel>{
        try{
            return await this.rmSkuService.getOptionValueData()
        }catch(err){
            return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
        }
    }

 
}