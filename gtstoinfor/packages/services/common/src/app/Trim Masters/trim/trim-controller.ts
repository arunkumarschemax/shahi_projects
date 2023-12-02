import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { trimService } from './trim-services';
import { AllTrimResponseModel } from '@project-management-system/shared-models';

@ApiTags('trim')
@Controller('trim')
export class TrimController {
    constructor(
        private trimservice: trimService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}

      @Post('/getAllActiveTrim')
      async getAllActiveTrim(@Req() request: Request): Promise<AllTrimResponseModel> {
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
  
   

    
}
