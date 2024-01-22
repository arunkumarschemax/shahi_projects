import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BomService } from "./bom-service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleDto } from "./dto/style-dto";

@ApiTags('bom')
@Controller('bom')
export class BomController{
    constructor(
    private readonly bomService: BomService,   
    private readonly applicationExceptionHandler: ApplicationExceptionHandler

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
}