import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Console } from 'console';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { trimEntity } from './trim-entity';
import { TrimAdapter } from './dto/trim-adapter';
import { AllTrimResponseModel } from '@project-management-system/shared-models';
import { TrimDTO } from './dto/trim-dto';

@Injectable()
export class trimService{
    constructor(
        @InjectRepository(trimEntity)

        private trimRepository: Repository<trimEntity>,
        private trimAdapter: TrimAdapter,
      ){}

        async getAllTrim(): Promise<AllTrimResponseModel> {
    
        try {
          const trimDTO: TrimDTO[] = [];
          const trimEnt: trimEntity[] = await this.trimRepository.find({ order :{'trimCategory':'ASC'}});
          if (trimEnt) {
            trimEnt.forEach(trimEnt => {
              const convertedtrimDTO: TrimDTO = this.trimAdapter.convertEntityToDto(
                trimEnt
              );
              trimDTO.push(convertedtrimDTO);
            });
    
  
            const response = new AllTrimResponseModel(true,1,'Trim retrieved successfully',trimDTO);

            return response;
          } else {
            throw new AllTrimResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveTrim(): Promise<AllTrimResponseModel> {
        try {
    
        const trimDTO: TrimDTO[] = [];
          const  trimEnt: trimEntity[] = await this.trimRepository.find({where:{"isActive":true},order :{'trimCategory':'ASC'}});
          
          if (trimEnt) {
            trimEnt.forEach(trimEnt => {
              const convertedDepartDto: TrimDTO = this.trimAdapter.convertEntityToDto(
                trimEnt
              );
              trimDTO.push(convertedDepartDto);
            });
    
  
            const response = new AllTrimResponseModel(true,1,'Trim retrieved successfully',trimDTO);
            return response;
          } else {
            throw new AllTrimResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  


    
}