import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel } from '@project-management-system/shared-models';
import { CompositionRepository } from './composition-repository/composition.repository';
import { CompositionAdapter } from './composition-dto/composition.adapter';
import { CompositionEnitty } from './composition.entity';
import { CompositionDTO } from './composition-dto/composition.dto';


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
      async createComposition(Dto: CompositionDTO, isUpdate: boolean): Promise<CompositionResponse> {
        try {
            if (!Dto || (Object.keys(Dto).length === 0 && Dto.constructor === Object)) {
                throw new CompositionResponse(false, 11107, 'Composition data is empty. At least one value is required.');
            }
    
            const existingEntity: CompositionEnitty | undefined = await this.repository.findOne({
                where: {
                    compositionCode: Dto.compositionCode,
                }
            });
    
            if (existingEntity) {
                throw new CompositionResponse(false, 11108, 'Combination must be unique.');
            }
    
            const convertedEntity: CompositionEnitty = this.adaptor.convertDtoToEntity(Dto, isUpdate);
            const savedEntity: CompositionEnitty = await this.repository.save(convertedEntity);
            const savedDto: CompositionDTO = this.adaptor.convertEntityToDto(savedEntity);
    
            if (savedDto) {
                const name = isUpdate ? 'updated' : 'created';
                const displayValue = isUpdate ? 'Composition Updated Successfully' : 'Composition Created Successfully';
                const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
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
      async ActivateOrDeactivate(req: CompositionDTO): Promise<CompositionResponse> {
        try {
          const roleExists = await this.getCompositionId(req.id);
          if (roleExists) {
            const roleStatus = await this.repository.update(
              { id: req.id },
              {
                isActive: !roleExists.isActive,
                updatedUser: req.compositionCode,
              }
            );
            const internalMessage: string = !roleExists.isActive
              ? "Composition Activated Successfully"
              : "Composition Daectivated Successfully";
            return new CompositionResponse(true, 54654, internalMessage);
          } else {
            return new CompositionResponse(false, 654695, "Data Not Found");
          }
        } catch (err) {
          return err;
        }
      }
}
