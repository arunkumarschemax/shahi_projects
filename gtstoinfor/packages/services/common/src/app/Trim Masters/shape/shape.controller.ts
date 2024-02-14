import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ShapeService } from "./shape.service";
import { ShapeDto } from "./shape-dto";

@ApiTags('shape')
@Controller('shape')
export class ShapeController{
    constructor(
        private service: ShapeService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveShape')
        async getAllActiveShape(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveShape()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllShapes')
        async getAllShapes(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllShapes()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createShape')
        @ApiBody({type:ShapeDto})
        async createShape(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createShape(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateShape')
        @ApiBody({type:ShapeDto})
        async updateShape(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createShape(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }
}