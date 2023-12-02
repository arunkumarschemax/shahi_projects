import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { varietyService } from './dto/variety-services';
import { AllVarietysResponseModel } from '@project-management-system/shared-models';

@ApiTags('variety')
@Controller('variety')
export class VarietyController {
    constructor(
        private varietyservice: varietyService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}

      @Post('/getAllActiveVariety')
      async getAllActiveVariety(@Req() request: Request): Promise<AllVarietysResponseModel> {
          try {
              return await this.varietyservice.getAllActiveVariety();
          } catch (error) {
              return this.applicationExceptionhandler.returnException(AllVarietysResponseModel, error)
          }
      }
      @Post('/getAllVariety')
      async getAllVariety(): Promise<AllVarietysResponseModel> {
        try {
          return await this.varietyservice.getAllVariety();
        } catch (error) {
          return this.applicationExceptionhandler.returnException(AllVarietysResponseModel, error);
        }
      } 
  
   

    
}
