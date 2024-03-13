import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {CommonResponseModel } from '@project-management-system/shared-models';
import { FunctionDTO } from './dto/function.dto';
import { FunctionService } from './function.service';

@ApiTags('function')
@Controller('function')
export class FunctionController {


    constructor(
        private readonly functionService: FunctionService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllFunction')
      async getAllFunction(): Promise<CommonResponseModel> {
          try {
           return await this.functionService.getAllFunction();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createFunction')
      @ApiBody({type: FunctionDTO})
      async createFunction(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.functionService.createFunction(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateFunction')
      @ApiBody({type: FunctionDTO})
      async updateFunction(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.functionService.createFunction(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateFunction')
      @ApiBody({type: FunctionDTO})
      async activateOrDeactivateFunction(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.functionService.activateOrDeactivateFunction(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveFunction')
      async getAllActiveFunction(): Promise<CommonResponseModel>{
          try{
              return await this.functionService.getAllActiveFunction()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getFunctionById')
      @ApiBody({type: FunctionDTO})
      async getFunctionById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.functionService.getFunctionById(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }


    //   @Post('/getAllHolesForCategory')
    //   @ApiBody({type: CategoryIdRequest})
    //   async getAllHolesForCategory(@Body() req: any): Promise<CommonResponseModel>{
    //       try{
    //           return await this.trimUomService.getAllHolesForCategory(req)
    //       }catch (error){
    //           return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
    //       }
    //   }

}

