import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse, SearchGrpResponse } from '@project-management-system/shared-models';
import { SearchGroupRepository } from './search-grp-repo/search-group.repo';
import { SearchGroupAdapter } from './search-group-dto/search-group.adapter';


@Injectable()
export class SearchGrpService {
  
      constructor(
         private adaptor: SearchGroupAdapter,
        private repository: SearchGroupRepository,
        
      ) { }
    
    
    async getSearchGroupData(): Promise<SearchGrpResponse> {
        const data = await this.repository.find()
        if (data.length > 0){

            return new SearchGrpResponse(true, 1111, 'Data retreived',data )


        }
        return new SearchGrpResponse(false, 0, 'Data Not retreived',[])

      }

}
