import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FinishService } from './finish.service';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { FinishDTO } from './dto/finish.dto';

@ApiTags('finish')
@Controller('finish')
export class FinishController {


    constructor(
        private readonly finishService: FinishService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllFinish')
      async getAllFinish(): Promise<CommonResponseModel> {
          try {
           return await this.finishService.getAllFinish();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createFinish')
      @ApiBody({type: FinishDTO})
      async createFinish(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.finishService.createFinish(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateFinish')
      @ApiBody({type: FinishDTO})
      async updateFinish(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.finishService.createFinish(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateFinish')
      @ApiBody({type: FinishDTO})
      async activateOrDeactivateFinish(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.finishService.activateOrDeactivateFinish(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveFinish')
      async getAllActiveFinish(): Promise<CommonResponseModel>{
          try{
              return await this.finishService.getAllActiveFinish()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getFinishById')
      @ApiBody({type: FinishDTO})
      async getFinishById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.finishService.getFinishById(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getFabricFinishData')
      async getFabricFinishData(): Promise<CommonResponseModel>{
          try{
              return await this.finishService.getFabricFinishData()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

}

