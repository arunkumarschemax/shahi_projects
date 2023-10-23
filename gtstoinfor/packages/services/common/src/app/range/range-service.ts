import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AllCountriesResponseModel, CompositionResponse, CountriesResponseModel, RangeResponse } from '@project-management-system/shared-models';
import { RangeRepository } from './range-repo/range-repo';
import { RangeAdapter } from './range-dto/range-adapter';
import { RangeDTO } from './range-dto/range-dto';
import { RangeEnitty } from './range-entity';


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
    
            const existingEntity: RangeEnitty | undefined = await this.repository.findOne({
                where: {
                    rangeCode: Dto.rangeCode,
                }
            });
    
            if (existingEntity) {
                throw new RangeResponse(false, 11108, 'Range code must be unique.');
            }
    
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
      async ActivateOrDeactivate(req: RangeDTO): Promise<RangeResponse> {
        try {
          const roleExists = await this.getRangeById(req.id);
          if (roleExists) {
            const roleStatus = await this.repository.update(
              { id: req.id },
              {
                isActive: !roleExists.isActive,
                updatedUser: req.rangeCode,
              }
            );
            const internalMessage: string = !roleExists.isActive
              ? "Range Activated Successfully"
              : "Range Daectivated Successfully";
            return new RangeResponse(true, 54654, internalMessage);
          } else {
            return new RangeResponse(false, 654695, "Data Not Found");
          }
        } catch (err) {
          return err;
        }
      }
}
