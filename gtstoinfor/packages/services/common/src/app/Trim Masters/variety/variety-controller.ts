import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { varietyService } from './variety-services';
import { AllVarietysResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
import { VarietyDTO } from './dto/variety-dto';

@ApiTags('variety')
@Controller('variety')
export class VarietyController {
    constructor(
        private varietyservice: varietyService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
      @Post('/createVariety')
    @ApiBody({type: VarietyDTO})
    async createVariety(@Body() VarietyDTO:any,isUpdate:boolean=false): Promise<CommonResponseModel> {
    try {
        return await this.varietyservice.createVariety(VarietyDTO, false);
    } catch (error) {
        return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
    }
    }

    @Post('/updateVariety')
    @ApiBody({type:VarietyDTO})
    async updateVariety(@Body() VarietyDTO: any): Promise<CommonResponseModel> {
        try {
        return await this.varietyservice.createVariety(VarietyDTO, true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }


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
  
      @Post('/activateOrDeactivateVariety')
      @ApiBody({type:VarietyDTO})
      async activateOrDeactivateVariety(@Body() Req: any): Promise<CommonResponseModel> {
        console.log(Req,"req comnn")
          try {
              return await this.varietyservice.activateOrDeactivateVariety(Req);
          } catch (err) {
              return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
          }
      }

      @Post('/getActiveVarietyById')
      @ApiBody({type:VarietyDTO})
      async getActiveVarietyById(@Body()req:any): Promise<AllVarietysResponseModel> {
        console.log(req,"coo")
        try {
          return await this.varietyservice.getActiveVarietyById(req);
        } catch (error) {
          return this.applicationExceptionhandler.returnException(AllVarietysResponseModel, error);
        }
        
    }
  
   

    
}
