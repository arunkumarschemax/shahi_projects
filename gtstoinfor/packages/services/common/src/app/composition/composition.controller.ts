import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CompositionService } from './composition.services';

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
 
}
