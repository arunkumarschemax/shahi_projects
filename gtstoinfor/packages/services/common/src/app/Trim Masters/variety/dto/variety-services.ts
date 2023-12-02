import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Console } from 'console';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { variety } from '../variety-entity';
import { VarietyAdapter } from './variety-adapter';
import { AllVarietysResponseModel } from '@project-management-system/shared-models';
import { VarietyDTO } from './variety-dto';

@Injectable()
export class varietyService{
    constructor(
        @InjectRepository(variety)

        private varRepository: Repository<variety>,
        private varAdapter: VarietyAdapter,
      ){}

        async getAllVariety(): Promise<AllVarietysResponseModel> {
    
        try {
          const varDTO: VarietyDTO[] = [];
          const varEntity: variety[] = await this.varRepository.find({ order :{'varietyCode':'ASC'}});
          if (varEntity) {
            varEntity.forEach(varEntity => {
              const convertedVarDTO: VarietyDTO = this.varAdapter.convertEntityToDto(
                varEntity
              );
              varDTO.push(convertedVarDTO);
            });
    
  
            const response = new AllVarietysResponseModel(true,1,'Variety retrieved successfully',varDTO);

            return response;
          } else {
            throw new AllVarietysResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveVariety(): Promise<AllVarietysResponseModel> {
        try {
    
        const varDTO: VarietyDTO[] = [];
          const  varEntity: variety[] = await this.varRepository.find({where:{"isActive":true},order :{'varietyCode':'ASC'}});
          
          if (varEntity) {
            varEntity.forEach(varEntity => {
              const convertedDepartDto: VarietyDTO = this.varAdapter.convertEntityToDto(
                varEntity
              );
              varDTO.push(convertedDepartDto);
            });
    
  
            const response = new AllVarietysResponseModel(true,1,'Variety retrieved successfully',varDTO);
            return response;
          } else {
            throw new AllVarietysResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  


    
}