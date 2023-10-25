import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse } from '@project-management-system/shared-models';
import { RangeRepository } from './range-repo/range-repo';
import { RangeAdapter } from './range-dto/range-adapter';
import { RangeDTO } from './range-dto/range-dto';
import { RangeEnitty } from './range-entity';
import { RangeRequestAct } from './range-dto/range-act-req';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';


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

      async createRange(Dto: RangeDTO, isUpdate: boolean): Promise<RangeResponse> {
        try {
            if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
                throw new RangeResponse(false, 11107, 'Range data is empty. At least one value is required.');
            }
  
            if (isUpdate) {
            const existingEntity: RangeEnitty | undefined = await this.repository.findOne({
                where: {
                    rangeCode: Dto.rangeCode,
                }
            });
    
            if (existingEntity) {
                throw new RangeResponse(false, 11108, 'Range code must be unique.');
            }}
            const convertedEntity: RangeEnitty = this.adaptor.convertDtoToEntity(Dto, isUpdate);
            const savedEntity: RangeEnitty = await this.repository.save(convertedEntity);
            const savedDto: RangeDTO = this.adaptor.convertEntityToDto(savedEntity);
    
            if (savedDto) {
                const name = isUpdate ? 'updated' : 'created';
                const displayValue = isUpdate ? 'Range Updated Successfully' : 'Range Created Successfully';
                const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
                const response = new RangeResponse(true, 1, displayValue);
                return response;
            } else {
                throw new RangeResponse(false, 11106, 'Range saved but issue while transforming into DTO');
            }
        } catch (error) {
            return error;
        }
    }
    
    
    
      async getActiveRange(): Promise<RangeResponse> {
        const data = await this.repository.find({ where: { isActive: true } })
        const activeData: RangeDTO[] = []
        for (const record of data) {
          const adapterData = this.adaptor.convertEntityToDto(record)
          activeData.push(adapterData)
        }
        return new RangeResponse(true, 1111, 'Data retreived', activeData)
      }
      async getRangeById(id: number): Promise<RangeEnitty> {
        const Response = await this.repository.findOne({ where: { id: id }, });
        if (Response) {
          return Response;
        } else {
          return null;
        }
      }
      async activateOrDeactivateRange(rangeReq: RangeRequestAct): Promise<RangeResponse> {
        try {
            const CompostionExists = await this.getRangeById(rangeReq.id);
            if (CompostionExists) {
                if (!CompostionExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Composition information. Refresh and tryagain');
                } else {
                    
                        const compositionStatus =  await this.repository.update(
                            { id: rangeReq.id },
                            { isActive: rangeReq.isActive,updatedUser: rangeReq.updatedUser });
                       
                        if (CompostionExists.isActive) {
                            if (compositionStatus.affected) {
                                const liscenceTypeResponse: RangeResponse = new RangeResponse(true, 10115, 'Composition is deactivated successfully');
                                return liscenceTypeResponse;
                            } else {
                                throw new RangeResponse(false,10111, 'Composition is already deactivated');
                            }
                        } else {
                            if (compositionStatus.affected) {
                                const liscenceTypeResponse: RangeResponse = new RangeResponse(true, 10114, 'Composition is activated successfully');
                                return liscenceTypeResponse;
                            } else {
                                throw new RangeResponse(false,10112, 'Composition is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new RangeResponse(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
      }
}
