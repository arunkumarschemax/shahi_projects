import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SubstituionService } from "./substituion.service";
import { CommonResponseModel, SubstituionModel, SubstituionReq } from "@project-management-system/shared-models";
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
    async getSubstitution(@Body() req:any):Promise<CommonResponseModel>{
        try{
            console.log(req,'controller')
            return await this.substituionService.getSubstitution(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }
}