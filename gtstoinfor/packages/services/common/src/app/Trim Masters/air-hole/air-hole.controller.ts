import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {CommonResponseModel } from '@project-management-system/shared-models';
import { AirHoleService } from './air-hole.service';
import { AirHoleDTO } from './dto/air-hole.dto';

@ApiTags('air-holes')
@Controller('air-holes')
export class AirHoleController {


    constructor(
        private readonly airHoleService: AirHoleService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllAirHole')
      async getAllAirHole(): Promise<CommonResponseModel> {
          try {
           return await this.airHoleService.getAllAirHole();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createAirHole')
      @ApiBody({type: AirHoleDTO})
      async createAirHole(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.airHoleService.createAirHole(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateAirHole')
      @ApiBody({type: AirHoleDTO})
      async updateAirHole(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.airHoleService.createAirHole(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateAirHole')
      @ApiBody({type: AirHoleDTO})
      async activateOrDeactivateAirHole(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.airHoleService.activateOrDeactivateAirHole(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveAirHole')
      async getAllActiveAirHole(): Promise<CommonResponseModel>{
          try{
              return await this.airHoleService.getAllActiveAirHole()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAirHoleById')
      @ApiBody({type: AirHoleDTO})
      async getAirHoleById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.airHoleService.getAirHoleById(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }



}

