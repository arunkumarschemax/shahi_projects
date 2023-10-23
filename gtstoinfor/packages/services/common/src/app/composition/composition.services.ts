import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionRequest, CompositionResponse, CountriesResponseModel } from '@project-management-system/shared-models';
import { CompositionRepository } from './composition-repository/composition.repository';
import { CompositionAdapter } from './composition-dto/composition.adapter';
import { CompositionEnitty } from './composition.entity';
import { CompositionDTO } from './composition-dto/composition.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { CompositionRequestAct } from './composition-dto/composition-act-req.tdto';


@Injectable()
export class CompositionService {
  
      constructor(
         private adaptor: CompositionAdapter,
        private repository: CompositionRepository,
        
      ) { }
    
      async getCompositionWithoutRelations(compositionCode: string): Promise<CompositionEnitty> {
        const responseModel = await this.repository.findOne({
          where: { compositionCode: Raw(alias => `composition_code = '${compositionCode}'`) },
        });
        if (responseModel) {
          return responseModel;
        } else {
          return null;
        }
      }
    //   async createComposition(Dto: CompositionDTO, isUpdate: boolean): Promise<CompositionResponse> {
    //     try {
    //         if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
    //             throw new CompositionResponse(false, 11107, 'Composition data is empty. At least one value is required.');
    //         }
    
    //         const existingEntity: CompositionEnitty | undefined = await this.repository.findOne({
    //             where: {
    //                 compositionCode: Dto.compositionCode,
    //             }
    //         });
    
    //         if (existingEntity) {
    //             throw new CompositionResponse(false, 11108, 'Combination must be unique.');
    //         }
    
    //         const convertedEntity: CompositionEnitty = this.adaptor.convertDtoToEntity(Dto, isUpdate);
    //         const savedEntity: CompositionEnitty = await this.repository.save(convertedEntity);
    //         const savedDto: CompositionDTO = this.adaptor.convertEntityToDto(savedEntity);
    
    //         if (savedDto) {
    //             const name = isUpdate ? 'updated' : 'created';
    //             const displayValue = isUpdate ? 'Composition Updated Successfully' : 'Composition Created Successfully';
    //             const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
    //             const response = new CompositionResponse(true, 1, displayValue);
    //             return response;
    //         } else {
    //             throw new CompositionResponse(false, 11106, 'Composition saved but issue while transforming into DTO');
    //         }
    //     } catch (error) {
    //         return error;
    //     }
    // } only for create 

  //this can be update the both code , description 
  async createComposition(Dto: CompositionDTO, isUpdate: boolean): Promise<CompositionResponse> {
    try {
        if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
            throw new CompositionResponse(false, 11107, 'Composition data is empty. At least one value is required.');
        }

        if (isUpdate) {
            const existingEntity: CompositionEnitty | undefined = await this.repository.findOne({
                where: {
                    compositionCode: Dto.compositionCode,
                },
            });

            if (existingEntity && existingEntity.id !== Dto.id) {
                throw new CompositionResponse(false, 11112, 'New compositionCode must be unique.');
            }
        }

        const convertedEntity: CompositionEnitty = this.adaptor.convertDtoToEntity(Dto, isUpdate);
        const savedEntity: CompositionEnitty = await this.repository.save(convertedEntity);
        const savedDto: CompositionDTO = this.adaptor.convertEntityToDto(savedEntity);

        if (savedDto) {
            const displayValue = isUpdate ? 'Composition Updated Successfully' : 'Composition Created Successfully';
            const response = new CompositionResponse(true, 1, displayValue);
            return response;
        } else {
            throw new CompositionResponse(false, 11106, 'Composition saved but issue while transforming into DTO');
        }
    } catch (error) {
        return error;
    }
}

    
    
    async getCompositionData(): Promise<CompositionResponse> {
        const data = await this.repository.find()
        if (data.length > 0){

            return new CompositionResponse(true, 1111, 'Data retreived',data )
        }
        return new CompositionResponse(false, 0, 'Data Not retreived',[])
      }

      async getActiveComposition(): Promise<CompositionResponse> {
        const data = await this.repository.find({ where: { isActive: true } })
        const activeData: CompositionDTO[] = []
        for (const record of data) {
          const adapterData = this.adaptor.convertEntityToDto(record)
          activeData.push(adapterData)
        }
        return new CompositionResponse(true, 1111, 'Data retreived', activeData)
      }
      async getCompositionId(id: number): Promise<CompositionEnitty> {
        const Response = await this.repository.findOne({ where: { id: id }, });
        if (Response) {
          return Response;
        } else {
          return null;
        }
      }
      async activateOrDeactivateComposition(CompositionReq: CompositionRequestAct): Promise<CompositionResponse> {
        try {
            const CompostionExists = await this.getCompositionId(CompositionReq.id);
            if (CompostionExists) {
                if (!CompostionExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Composition information. Refresh and tryagain');
                } else {
                    
                        const compositionStatus =  await this.repository.update(
                            { id: CompositionReq.id },
                            { isActive: CompositionReq.isActive,updatedUser: CompositionReq.updatedUser });
                       
                        if (CompostionExists.isActive) {
                            if (compositionStatus.affected) {
                                const liscenceTypeResponse: CompositionResponse = new CompositionResponse(true, 10115, 'Composition is deactivated successfully');
                                return liscenceTypeResponse;
                            } else {
                                throw new CompositionResponse(false,10111, 'Composition is already deactivated');
                            }
                        } else {
                            if (compositionStatus.affected) {
                                const liscenceTypeResponse: CompositionResponse = new CompositionResponse(true, 10114, 'Composition is activated successfully');
                                return liscenceTypeResponse;
                            } else {
                                throw new CompositionResponse(false,10112, 'Composition is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new CompositionResponse(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
      }
}
