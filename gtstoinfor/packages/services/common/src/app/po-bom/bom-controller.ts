import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { BomService } from "./bom-service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleDto } from "./dto/style-dto";
import { TrimService } from "./trim-service";
import { StyleNumberDto } from "./dto/style-number-dto";

@ApiTags('bom')
@Controller('bom')
export class BomController{
    constructor(
    private readonly bomService: BomService,   
    private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    private readonly trimService : TrimService

    ){}
    
    @Post('/createBom')
    async createBom(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return this.bomService.createBom(req)
        }
        catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
    @Post('/getAllStylesData')
    async getAllStylesData():Promise<CommonResponseModel>{
        try{
            return this.bomService.getAllStylesData()
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
    @Post('/getAll')
    async getAll():Promise<CommonResponseModel>{
        try{
            return this.bomService.getAll()
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
    
    @Post('/getPpmPoLineData')
    async getPpmPoLineData():Promise<CommonResponseModel>{
        try{
            return this.bomService.getPpmPoLineData()
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getAllTrimInfo')
    async getAllTrimInfo():Promise<CommonResponseModel>{
        try{
            return this.trimService.getAllTrimInfo()
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @ApiBody({ type: StyleNumberDto })
    @Post('/getBomInfoAgainstStyle')
    async getBomInfoAgainstStyle(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return this.trimService.getBomInfoAgainstStyle(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getItemInfo')
    async getItemInfo(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return this.trimService.getItemInfo(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getItemDropdownByCreatedAt')
    async getItemDropdownByCreatedAt(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return this.trimService.getItemDropdownByCreatedAt(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getRegionDropdownByCreatedAt')
    async getRegionDropdownByCreatedAt(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return this.trimService.getRegionDropdownByCreatedAt(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
}