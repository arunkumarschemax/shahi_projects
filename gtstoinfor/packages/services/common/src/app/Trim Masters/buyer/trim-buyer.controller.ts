import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { TrimBuyerService } from "./trim-buyer-service";
import { TrimBuyerDto } from "./trim-buyer.dto";

@ApiTags('trim-buyer')
@Controller('trim-buyer')
export class TrimBuyerController{
    constructor(
        private service: TrimBuyerService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveTrimBuyers')
        async getAllActiveTrimBuyers(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveTrimBuyers()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllTrimBuyers')
        async getAllTrimBuyers(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllTrimBuyers()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createTrimBuyer')
        @ApiBody({type:TrimBuyerDto})
        async createTrimBuyer(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createTrimBuyer(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateTrimBuyer')
        @ApiBody({type:TrimBuyerDto})
        async updateTrimBuyer(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createTrimBuyer(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
}