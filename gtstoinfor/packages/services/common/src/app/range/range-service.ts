import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse } from '@project-management-system/shared-models';
import { RangeRepository } from './range-repo/range-repo';
import { RangeAdapter } from './range-dto/range-adapter';


@Injectable()
export class RangeService {
  
      constructor(
         private adaptor: RangeAdapter,
        private repository: RangeRepository,
        
      ) { }
    
    
    async getRangeData(): Promise<RangeResponse> {
        const data = await this.repository.find()
        if (data.length > 0){

            return new RangeResponse(true, 1111, 'Data retreived',data )


        }
        return new RangeResponse(false, 0, 'Data Not retreived',[])

      }

}
