import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PartsService } from "./parts.service";
import { PartsDto } from "./parts.dto";

@ApiTags('parts')
@Controller('parts')
export class PartsController{
    constructor(
        private service: PartsService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveParts')
        async getAllActiveParts(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveParts()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllParts')
        async getAllParts(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllParts()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createParts')
        @ApiBody({type:PartsDto})
        async createParts(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createParts(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateParts')
        @ApiBody({type:PartsDto})
        async updateParts(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createParts(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
}