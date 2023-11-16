import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyersResponseModel, CommonResponseModel, SettingsIdReq, SettingsRequest, SettingsResponseModel } from "@project-management-system/shared-models";
import { SettingsService } from "./settings.service";

@ApiTags('Settings')
@Controller('settings')
export class SettingsController{
    constructor(
        private settingsService : SettingsService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ){}

    @Post('/createSettings')
    async createSettings(@Body() req:any):Promise<SettingsResponseModel>{
        try{
            return await this.settingsService.createSettings(req,false)
        }catch(err){
            return this.applicationExceptionhandler.returnException(SettingsResponseModel,err)
        }
    }

    @Post('/updateSettings')
    async updateSettings(@Body() req:any):Promise<SettingsResponseModel>{
        try{
            return await this.settingsService.createSettings(req,true)
        }catch(err){
            return this.applicationExceptionhandler.returnException(SettingsResponseModel,err)
        }
    }

    @Post('/getAllSettingsInfo')
    async getAllSettingsInfo(@Body() req:any):Promise<SettingsResponseModel>{
        try{
            return await this.settingsService.getAllSettingsInfo(req)
        }catch(err){
            return this.applicationExceptionhandler.returnException(SettingsResponseModel,err)
        }
    }
}