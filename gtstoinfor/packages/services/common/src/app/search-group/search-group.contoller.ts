import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse, SearchGrpResponse } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { SearchGrpService } from './search-group.service';

@ApiTags('searchGroup')
@Controller('searchGroup')
export class SearchGroupController {

    constructor(
      private Service: SearchGrpService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
   
  
  @Post('/getSearchGroupData')
  async getSearchGroupData(): Promise<SearchGrpResponse> {
    try {
      return await this.Service.getSearchGroupData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(SearchGrpResponse, error);
    }
  }
 
}
