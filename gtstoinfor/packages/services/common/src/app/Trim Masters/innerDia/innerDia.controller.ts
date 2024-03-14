import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {CommonResponseModel } from '@project-management-system/shared-models';
import { InnerDiaService } from './innerDia.service';
import { InnerDiaDTO } from './dto/innerDia.dto';

@ApiTags('innerDia')
@Controller('innerDia')
export class InnerDiaController {


    constructor(
        private readonly innerDiaService: InnerDiaService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllInnerDia')
      async getAllInnerDia(): Promise<CommonResponseModel> {
          try {
           return await this.innerDiaService.getAllInnerDia();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createInnerDia')
      @ApiBody({type: InnerDiaDTO})
      async createInnerDia(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.innerDiaService.createInnerDia(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateInnerDia')
      @ApiBody({type: InnerDiaDTO})
      async updateInnerDia(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.innerDiaService.createInnerDia(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateInnerDia')
      @ApiBody({type: InnerDiaDTO})
      async activateOrDeactivateInnerDia(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.innerDiaService.activateOrDeactivateInnerDia(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveInnerDia')
      async getAllActiveInnerDia(): Promise<CommonResponseModel>{
          try{
              return await this.innerDiaService.getAllActiveInnerDia()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getInnerDiaById')
      @ApiBody({type: InnerDiaDTO})
      async getInnerDiaById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.innerDiaService.getInnerDiaById(req)
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

