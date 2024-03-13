import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CategoryIdRequest, CommonResponseModel } from '@project-management-system/shared-models';
import { TrimUomService } from './trim-uom.service';
import { TrimUomDTO } from './dto/trim-uom.dto';

@ApiTags('trim-uom')
@Controller('trim-uom')
export class TrimUomController {


    constructor(
        private readonly trimUomService: TrimUomService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllTrimUom')
      async getAllTrimUom(): Promise<CommonResponseModel> {
          try {
           return await this.trimUomService.getAllTrimUom();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createTrimUom')
      @ApiBody({type: TrimUomDTO})
      async createTrimUom(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.trimUomService.createTrimUom(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateTrimUom')
      @ApiBody({type: TrimUomDTO})
      async updateTrimUom(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.trimUomService.createTrimUom(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateTrimUom')
      @ApiBody({type: TrimUomDTO})
      async activateOrDeactivateTrimUom(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.trimUomService.activateOrDeactivateTrimUom(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveTrimUom')
      async getAllActiveTrimUom(): Promise<CommonResponseModel>{
          try{
              return await this.trimUomService.getAllActiveTrimUom()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getTrimUomById')
      @ApiBody({type: TrimUomDTO})
      async getTrimUomById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.trimUomService.getTrimUomById(req)
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

