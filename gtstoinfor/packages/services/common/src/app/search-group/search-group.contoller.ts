import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse, SearchGrpResponse } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { SearchGrpService } from './search-group.service';
import { SearchGroupDTO } from './search-group-dto/search-group.dto';

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
  @Post('/createSearchGroup')
  @ApiBody({type:SearchGroupDTO})
  async createSearchGroup(@Body() Dto:any): Promise<SearchGrpResponse>{
      try{
          return await this.Service.createSearchGroup(Dto,false)
      }catch(error){
          return this.applicationExceptionHandler.returnException(SearchGrpResponse, error)
      }
  }

 @Post('/UpdateSearchGroup')
 @ApiBody({type:SearchGroupDTO})
async UpdateSearchGroup(@Body()request:any): Promise<SearchGrpResponse> {
  try {
     
    return await this.Service.createSearchGroup(request, true);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(SearchGrpResponse, error);
  }
}
@Post('/getActiveSearchGroup')
    async getActiveSearchGroup() : Promise<SearchGrpResponse>{
        try{
            return await this.Service.getActiveSearchGroup()
        }catch(error){
            return this.applicationExceptionHandler.returnException(SearchGrpResponse, error);
        }
    }

    @Post("/ActivateOrDeactivate")
  async ActivateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<SearchGrpResponse>{
    return await this.Service.ActivateOrDeactivate(activateDeactivateReq)
    }
 
}
