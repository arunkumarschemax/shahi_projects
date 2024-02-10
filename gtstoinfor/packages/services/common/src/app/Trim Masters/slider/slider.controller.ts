import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { SliderService } from "./slider-service";
import { SliderDto } from "./slider-dto";

@ApiTags('slider')
@Controller('slider')
export class SliderController{
    constructor(
        private service: SliderService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveSliders')
        async getAllActiveSliders(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveSliders()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllSliders')
        async getAllSliders(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllSliders()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createSlider')
        @ApiBody({type:SliderDto})
        async createSlider(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createSlider(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateSlider')
        @ApiBody({type:SliderDto})
        async updateSlider(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createSlider(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
}