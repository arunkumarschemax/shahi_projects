import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BomService } from "./bom-service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleDto } from "./dto/style-dto";
import { TrimService } from "./trim-service";

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
}