import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { HoleService } from './hole.service';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { HoleDTO } from './dto/hole.dto';

@ApiTags('hole')
@Controller('hole')
export class HoleController {


    constructor(
        private readonly holeService: HoleService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/getAllHoles')
      async getAllHoles(): Promise<CommonResponseModel> {
          try {
           return await this.holeService.getAllHoles();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/createHole')
      @ApiBody({type: HoleDTO})
      async createHole(@Body() req:any): Promise<CommonResponseModel> {
          try {
           return await this.holeService.createHole(req, false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
         }
      }

      @Post('/updateHole')
      @ApiBody({type: HoleDTO})
      async updateHole(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.holeService.createHole(req, true)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/activateOrDeactivateHole')
      @ApiBody({type: HoleDTO})
      async activateOrDeactivateHole(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.holeService.activateOrDeactivateHole(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getAllActiveHole')
      async getAllActiveHole(): Promise<CommonResponseModel>{
          try{
              return await this.holeService.getAllActiveHole()
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }

      @Post('/getHoleById')
      @ApiBody({type: HoleDTO})
      async getHoleById(@Body() req: any): Promise<CommonResponseModel>{
          try{
              return await this.holeService.getHoleById(req)
          }catch (error){
              return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
          }
      }


}

