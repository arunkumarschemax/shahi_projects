import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PatternService } from "./pattern.service";
import { PatternDto } from "./pattern.dto";

@ApiTags('pattern')
@Controller('pattern')
export class PatternController{
    constructor(
        private service: PatternService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActivePatterns')
        async getAllActivePatterns(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActivePatterns()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllPatterns')
        async getAllPatterns(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllPatterns()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createPattern')
        @ApiBody({type:PatternDto})
        async createPattern(@Body() req:any): Promise<CommonResponseModel>{
            try{
                console.log(req,'...........................................')
                return await this.service.createPattern(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updatePattern')
        @ApiBody({type:PatternDto})
        async updatePattern(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createPattern(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/activateDeactivatePattern')
        @ApiBody({type:PatternDto})
        async activateDeactivatePattern(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.activateDeactivatePattern(req)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
}