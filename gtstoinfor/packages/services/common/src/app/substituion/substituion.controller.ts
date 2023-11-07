import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SubstituionService } from "./substituion.service";
import { CommonResponseModel, SubstituionReq } from "@project-management-system/shared-models";
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
}