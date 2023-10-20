import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel } from '@project-management-system/shared-models';
import { CompositionRepository } from './composition-repository/composition.repository';
import { CompositionAdapter } from './composition-dto/composition.adapter';


@Injectable()
export class CompositionService {
  
      constructor(
         private adaptor: CompositionAdapter,
        private repository: CompositionRepository,
        
      ) { }
    
    
    async getCompositionData(): Promise<CompositionResponse> {
        const data = await this.repository.find()
        if (data.length > 0){

            return new CompositionResponse(true, 1111, 'Data retreived',data )


        }
        return new CompositionResponse(false, 0, 'Data Not retreived',[])

      }

}
