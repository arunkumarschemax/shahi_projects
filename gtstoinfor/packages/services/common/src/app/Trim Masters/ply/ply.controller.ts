import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { PlyService } from "./ply.service";
import { PlyDto } from "./ply.dto";

@ApiTags('ply')
@Controller('ply')
export class PlyController{
    constructor(
        private service: PlyService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActivePly')
        async getAllActivePly(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActivePly()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllPlys')
        async getAllPlys(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllPlys()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createPly')
        @ApiBody({type:PlyDto})
        async createPly(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createPly(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updatePly')
        @ApiBody({type:PlyDto})
        async updatePly(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createPly(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllPlyForCategory')
        @ApiBody({type: CategoryIdRequest})
        async getAllPlyForCategory(@Body() req: any): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllPlyForCategory(req)
            }catch (error){
                return this.applicationHandler.returnException(CommonResponseModel,error)
            }
        }
}