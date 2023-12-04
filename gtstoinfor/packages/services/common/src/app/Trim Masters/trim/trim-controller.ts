import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { trimService } from './trim-services';
import { AllTrimResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
import { TrimDTO } from './dto/trim-dto';

@ApiTags('trim')
@Controller('trim')
export class TrimController {
    constructor(
        private trimservice: trimService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}

      @Post('/createTrim')
      @ApiBody({type: TrimDTO})
      async createTrim(@Body() TrimDTO:any,isUpdate:boolean=false): Promise<CommonResponseModel> {
      try {
          return await this.trimservice.createTrim(TrimDTO, false);
      } catch (error) {
          return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
      }
      }
  
      @Post('/updateTrim')
      @ApiBody({type:TrimDTO})
      async updateTrim(@Body() TrimDTO: any): Promise<CommonResponseModel> {
          try {
          return await this.trimservice.createTrim(TrimDTO, true);
          } catch (error) {
              return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
          }
      }

      @Post('/getAllActiveTrim')
      async getAllActiveTrim(@Req() request: any): Promise<AllTrimResponseModel> {
          try {
              return await this.trimservice.getAllActiveTrim();
          } catch (error) {
              return this.applicationExceptionhandler.returnException(AllTrimResponseModel, error)
          }
      }
      @Post('/getAllTrim')
      async getAllTrim(): Promise<AllTrimResponseModel> {
        try {
          return await this.trimservice.getAllTrim();
        } catch (error) {
          return this.applicationExceptionhandler.returnException(AllTrimResponseModel, error);
        }
      } 

      @Post('/activateOrDeactivateTrim')
      @ApiBody({type:TrimDTO})
      async activateOrDeactivateTrim(@Body() Req: any): Promise<CommonResponseModel> {
        console.log(Req,"req comnn")
          try {
              return await this.trimservice.activateOrDeactivateTrim(Req);
          } catch (err) {
              return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
          }
      }

      
      @Post('/getActiveTrimById')
      @ApiBody({type:TrimDTO})
      async getActiveTrimById(@Body()req:any): Promise<AllTrimResponseModel> {
        console.log(req,"coo")
        try {
          return await this.trimservice.getActiveTrimById(req);
        } catch (error) {
          return this.applicationExceptionhandler.returnException(AllTrimResponseModel, error);
        }
        
    }
  
   

    
}
