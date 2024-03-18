import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { LogoService } from "./logo.service";
import { LogoDto } from "./logo.dto";

@ApiTags('logo')
@Controller('logo')
export class LogoController{
    constructor(
        private service: LogoService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveLogo')
        async getAllActiveLogo(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveLogo()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllLogo')
        async getAllLogo(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllLogo()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createLogo')
        @ApiBody({type:LogoDto})
        async createLogo(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createLogo(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateLogo')
        @ApiBody({type:LogoDto})
        async updateLogo(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createLogo(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/activateOrDeactivateLogo')
        @ApiBody({type:LogoDto})
        async activateOrDeactivateLogo(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.activateOrDeactivateLogo(req)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
        @Post('/getAllLogosForCategory')
        @ApiBody({type: CategoryIdRequest})
        async getAllLogosForCategory(@Body() req: any): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllLogosForCategory(req)
            }catch (error){
                return this.applicationHandler.returnException(CommonResponseModel,error)
            }
        }
}