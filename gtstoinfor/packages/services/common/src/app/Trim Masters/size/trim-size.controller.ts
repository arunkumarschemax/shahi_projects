import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { TrimSizeService } from "./trim-size.service";
import { TrimSizeDto } from "./trim-size.dto";

@ApiTags('trim-size')
@Controller('trim-size')
export class TrimSizeController{
    constructor(
        private service: TrimSizeService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveTrimSizes')
        async getAllActiveTrimSizes(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveTrimSizes()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllTrimSizes')
        async getAllTrimSizes(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllTrimSizes()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createTrimSize')
        @ApiBody({type:TrimSizeDto})
        async createTrimSize(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createTrimSize(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateTrimSize')
        @ApiBody({type:TrimSizeDto})
        async updateTrimSize(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createTrimSize(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/activateOrDeactivateSize')
        @ApiBody({type:TrimSizeDto})
        async activateOrDeactivateSize(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.activateOrDeactivateSize(req)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
        @Post('/getAllTrimSizeForCategory')
        @ApiBody({type: CategoryIdRequest})
        async getAllTrimSizeForCategory(@Body() req: any): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllTrimSizeForCategory(req)
            }catch (error){
                return this.applicationHandler.returnException(CommonResponseModel,error)
            }
        }
}