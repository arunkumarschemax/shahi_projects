import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { RangeService } from './range-service';

@ApiTags('range')
@Controller('range')
export class RangeController {

    constructor(
      private Service: RangeService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
   
  
  @Post('/getRangeData')
  async getRangeData(): Promise<RangeResponse> {
    try {
      return await this.Service.getRangeData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(RangeResponse, error);
    }
  }
 
}
