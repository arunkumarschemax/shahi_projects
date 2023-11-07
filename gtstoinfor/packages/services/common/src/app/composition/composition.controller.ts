import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CompositionService } from './composition.services';
import { CompositionDTO } from './composition-dto/composition.dto';
import { CompositionRequestAct } from './composition-dto/composition-act-req.tdto';

@ApiTags('composition')
@Controller('composition')
export class CompositionController {

    constructor(
      private Service: CompositionService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
   
  
  @Post('/getCompositionData')
  async getCompositionData(): Promise<CompositionResponse> {
    try {
      return await this.Service.getCompositionData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CompositionResponse, error);
    }
  }
 
  @Post('/createComposition')
  @ApiBody({type:CompositionDTO})
  async createComposition(@Body() Dto:any): Promise<CompositionResponse>{
      try{
          return await this.Service.createComposition(Dto,false)
      }catch(error){
          return this.applicationExceptionHandler.returnException(CompositionResponse, error)
      }
  }

 @Post('/updateComposition')
 @ApiBody({type:CompositionDTO})
async updateComposition(@Body()request:any): Promise<CompositionResponse> {
  try {
     
    return await this.Service.createComposition(request, true);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(CompositionResponse, error);
  }
}
@Post('/getActiveComposition')
    async getActiveComposition() : Promise<CompositionResponse>{
        try{
            return await this.Service.getActiveComposition()
        }catch(error){
            return this.applicationExceptionHandler.returnException(CompositionResponse, error);
        }
    }

    @Post("/activateOrDeactivateComposition")
    @ApiBody({type: CompositionRequestAct})
  async activateOrDeactivateComposition(@Body() activateDeactivateReq:any) : Promise<CompositionResponse>{
  //  console.log(activateDeactivateReq,"activateDeactivateReq")
    return await this.Service.activateOrDeactivateComposition(activateDeactivateReq)
    }
}
