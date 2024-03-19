import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LineService } from "./line.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { LineDto } from "./line-dto";

@ApiTags('line')
@Controller('line')
export class LineController{
    constructor(
        private service: LineService,
        private readonly applicationHandler: ApplicationExceptionHandler
    ){}

        @Post('/getAllActiveLines')
        async getAllActiveLines(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllActiveLines()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/getAllLine')
        async getAllLine(): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllLine()
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/createLine')
        @ApiBody({type:LineDto})
        async createLine(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createLine(req,false)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/updateLine')
        @ApiBody({type:LineDto})
        async updateLine(@Body() req:any): Promise<CommonResponseModel>{
            try{
                return await this.service.createLine(req,true)
            }catch(err){
                return this.applicationHandler.returnException(CommonResponseModel,err)
            }
        }

        @Post('/activateOrDeactivateLine')
      @ApiBody({type: LineDto})
      async activateOrDeactivateLine(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.service.activateOrDeactivateLine(req)
          }catch (error){
              return this.applicationHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getLineById')
      @ApiBody({type: LineDto})
      async getLineById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.service.getLineById(req)
          }catch (error){
              return this.applicationHandler.returnException(CommonResponseModel,error)
          }
      }
      @Post('/getAllTrimLineForCategory')
        @ApiBody({type: CategoryIdRequest})
        async getAllTrimLineForCategory(@Body() req: any): Promise<CommonResponseModel>{
            try{
                return await this.service.getAllTrimLineForCategory(req)
            }catch (error){
                return this.applicationHandler.returnException(CommonResponseModel,error)
            }
        }
}