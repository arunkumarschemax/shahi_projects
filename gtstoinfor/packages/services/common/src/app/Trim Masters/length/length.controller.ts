import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { LengthService } from "./length.service";
import { LengthDto } from "./length-dto";

@ApiTags('length')
@Controller('length')
export class LengthController{
    constructor(
        private service: LengthService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveLengths')
        async getAllActiveLengths(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveLengths()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllLength')
        async getAllLength(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllLength()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createLength')
        @ApiBody({type:LengthDto})
        async createLength(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createLength(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateLength')
        @ApiBody({type:LengthDto})
        async updateLength(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createLength(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
        @Post('/getAllTrimLengthForCategory')
        @ApiBody({type: CategoryIdRequest})
        async getAllTrimLengthForCategory(@Body() req: any): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllTrimLengthForCategory(req)
            }catch (error){
                return this.applicationHandler.returnException(CommonResponseModel,error)
            }
        }
}