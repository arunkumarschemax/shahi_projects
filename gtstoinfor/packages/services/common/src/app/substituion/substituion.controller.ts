import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SubstituionService } from "./substituion.service";
import { CommonResponseModel, SubResponseModel, SubstituionModel, SubstituionReq } from "@project-management-system/shared-models";
import { SubstituionRequest } from "./substitution-req";

@ApiTags('substituion')
@Controller('substituion')
export class SubstituionController{
    constructor(
        private readonly substituionService :SubstituionService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}

    @Post('/createSubstitution')
    async createSubstitution(@Body() req:any):Promise<CommonResponseModel>{
        try{
            console.log(req,'yyyy')
            return await this.substituionService.createSubstitution(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getSubstitution')
    @ApiBody({type:SubstituionModel})
    async getSubstitution(@Body() req:any):Promise<SubResponseModel>{
        try{
            console.log(req,'controller')
            return await this.substituionService.getSubstitution(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(SubResponseModel,err)
        }
    }

    @Post('/getFgSku')
    async getFgSku():Promise<SubResponseModel>{
        try{
            return await this.substituionService.getFgSku()
        }catch(err){
            return this.applicationExceptionHandler.returnException(SubResponseModel,err)
        }
    }
    @Post('/getRmSku')
    async getRmSku():Promise<SubResponseModel>{
        try{
            return await this.substituionService.getRmSku()
        }catch(err){
            return this.applicationExceptionHandler.returnException(SubResponseModel,err)
        }
    }
}