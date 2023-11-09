import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
// import { DeliveryMethod } from './delivery-method.entity';
// import { DeliveryMethodAdapter } from './dto/delivery-method.adapter';
// import { DeliveryMethodDTO } from './dto/delivery-method.dto';
import { AllDeliveryResponseModel, DeliveryMethodResponseModel } from 'packages/libs/shared-models/src/common/delivery-method';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { LiscenceTypeAdapter } from './dto/liscence-type.adapter';
import { LiscenceType } from './liscence-type.entity';
import { LiscenceTypeDTO } from './dto/liscence-type.dto';
import { AllLiscenceResponseModel, LiscenceTypeResponseModel } from '@project-management-system/shared-models';
import { LiscenceTypeRequest } from './dto/liscence-type.request';

@Injectable()
export class LiscenceTypeService {
  
    constructor(
        @InjectRepository(LiscenceType)
        private liscenceTypeRepository: Repository<LiscenceType>,
        private liscenceTypeAdapter: LiscenceTypeAdapter,
      ){}

      async getDeliveryMethodWithoutRelations(liscenceType: string): Promise<LiscenceType>{
        const LiscenceTypeResponse = await this.liscenceTypeRepository.findOne({
          where: {liscenceType: Raw(alias => `liscence_type = '${liscenceType}'`)},
        });
        if(LiscenceTypeResponse){
          return LiscenceTypeResponse;
        }
        else{
          return null;
        }
      }

    // async createLiscenceType(liscenceTypeDTO: LiscenceTypeDTO, isUpdate: boolean): Promise<LiscenceTypeResponseModel> {
      
    //   try {
    //     let previousValue
    //     if (!isUpdate) {
    //       const deliveryMethodEntity = await this.liscenceTypeRepository.findOne({where:{liscenceType:liscenceTypeDTO.liscenceType}})
    //       if (deliveryMethodEntity) {
    //         throw new LiscenceTypeResponseModel(false,11104, 'Liscence Type already exists');
    //       }
    //     } else{
    //       const certificatePrevious = await this.liscenceTypeRepository.findOne({where:{liscenceTypeId:liscenceTypeDTO.liscenceTypeId}})
    //       previousValue = certificatePrevious.liscenceType
    //       if(!certificatePrevious) {
    //         throw new ErrorResponse(0, 'Given Liscence does not exist');
    //       }
    //     }
    //     const convertedLiscenceType: LiscenceType = this.liscenceTypeAdapter.convertDtoToEntity(liscenceTypeDTO,isUpdate);
    //     const savedLiscenceTypeEntity: LiscenceType = await this.liscenceTypeRepository.save(convertedLiscenceType);
    //     const savedLiscenceTypeDto: LiscenceTypeDTO = this.liscenceTypeAdapter.convertEntityToDto(convertedLiscenceType);
    //       // console.log(savedStateDto);
    //     if (savedLiscenceTypeDto) {
    //       const presentValue = savedLiscenceTypeDto.liscenceType;
    //      // generating resposnse
    //      const response = new LiscenceTypeResponseModel(true,1,isUpdate? 'Liscence Type Updated Successfully': 'Liscence Type Created Successfully');
    //      const name=isUpdate?'updated':'created'
    //      const displayValue = isUpdate? 'Liscence Type Updated Successfully': 'Liscence Type Created Successfully'
    //      const userName = isUpdate? savedLiscenceTypeDto.updatedUser :savedLiscenceTypeDto.createdUser;
    //      return response
    //     } else {
    //       throw new LiscenceTypeResponseModel(false,11106,'Liscence Type saved but issue while transforming into DTO');
    //     }
    //   } catch (error) {
    //     return error;
    //   }
    // }

    async createLiscenceType(liscenceTypeDTO: LiscenceTypeDTO, isUpdate: boolean): Promise<LiscenceTypeResponseModel> {
  
      try {
        let previousValue;
        
        if (!isUpdate) {
          const existingLiscenceType = await this.liscenceTypeRepository.findOne({ where: { liscenceType: liscenceTypeDTO.liscenceType } });
          if (existingLiscenceType) {
            throw new LiscenceTypeResponseModel(false, 11104, 'License Type already exists');
          }
        } else {
          const certificatePrevious = await this.liscenceTypeRepository.findOne({ where: { liscenceTypeId: liscenceTypeDTO.liscenceTypeId } });
          
          if (!certificatePrevious) {
            throw new ErrorResponse(0, 'Given License does not exist');
          }
    
          previousValue = certificatePrevious.liscenceType;
    
          if (liscenceTypeDTO.liscenceType === previousValue) {
            throw new LiscenceTypeResponseModel(false, 11105, 'New License Type is the same as the old value');
          }
    
          const existingLiscenceType = await this.liscenceTypeRepository.findOne({ where: { liscenceType: liscenceTypeDTO.liscenceType } });
          if (existingLiscenceType) {
            throw new LiscenceTypeResponseModel(false, 11107, 'New License Type already exists');
          }
        }
    
        const convertedLiscenceType: LiscenceType = this.liscenceTypeAdapter.convertDtoToEntity(liscenceTypeDTO, isUpdate);
        const savedLiscenceTypeEntity: LiscenceType = await this.liscenceTypeRepository.save(convertedLiscenceType);
        const savedLiscenceTypeDto: LiscenceTypeDTO = this.liscenceTypeAdapter.convertEntityToDto(convertedLiscenceType);
        
        if (savedLiscenceTypeDto) {
          const response = new LiscenceTypeResponseModel(true, 1, isUpdate ? 'License Type Updated Successfully' : 'License Type Created Successfully');
          const displayValue = isUpdate ? 'License Type Updated Successfully' : 'License Type Created Successfully';
          const userName = isUpdate ? savedLiscenceTypeDto.updatedUser : savedLiscenceTypeDto.createdUser;
          
          return response;
        } else {
          throw new LiscenceTypeResponseModel(false, 11106, 'License Type saved but issue while transforming into DTO');
        }
      } catch (error) {
        return error;
      }
    }
    
    
    async getAllLiscenceTypes(): Promise<any> {
     
      try {
        const liscenceTypeDTO: LiscenceTypeDTO[] = [];
        const liscenceTypeEntity: LiscenceType[] = await this.liscenceTypeRepository.find({ order :{liscenceType:'ASC'}});
        if (liscenceTypeEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          liscenceTypeEntity.forEach(DeliveryMethodEntity => {
            const convertedLiscenceTypedDto: LiscenceTypeDTO = this.liscenceTypeAdapter.convertEntityToDto(
              DeliveryMethodEntity
            );
            liscenceTypeDTO.push(convertedLiscenceTypedDto);
          });
  
          const response = new AllLiscenceResponseModel(true,1,'Liscence Type retrieved successfully',liscenceTypeDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveLiscenceTypes(): Promise<AllLiscenceResponseModel> {
      try {
        const liscenceTypeDTO: LiscenceTypeDTO[] = [];
        const liscenceTypeEntity: LiscenceType[] = await this.liscenceTypeRepository.find({where:{"isActive":true},order :{liscenceType:'ASC'}});
        
        if (liscenceTypeEntity) {
          liscenceTypeEntity.forEach(LiscenceTypeEntity => {
            const convertedLiscenceTypeDto: LiscenceTypeDTO = this.liscenceTypeAdapter.convertEntityToDto(
              LiscenceTypeEntity
            );
            liscenceTypeDTO.push(convertedLiscenceTypeDto);
          });

          const response = new AllLiscenceResponseModel(true,1,'Liscence Type retrieved successfully',liscenceTypeDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateLiscenceType(liscenceTypeReq: LiscenceTypeRequest): Promise<LiscenceTypeResponseModel> {
  try {
      const liscenceTypeExists = await this.getLiscenceTypeById(liscenceTypeReq.liscenceTypeId);
      //console.log(liscenceTypeExists,'sdfghjk')
      if (liscenceTypeExists) {
          if (!liscenceTypeExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Liscence Type information. Refresh and tryagain');
          } else {
              
                  const liscenceTypeStatus =  await this.liscenceTypeRepository.update(
                      { liscenceTypeId: liscenceTypeReq.liscenceTypeId },
                      { isActive: liscenceTypeReq.isActive,updatedUser: liscenceTypeReq.updatedUser });
                      // console.log(liscenceTypeStatus,'kkkkkkkkkkk')
                 
                  if (liscenceTypeExists.isActive) {
                      if (liscenceTypeStatus.affected) {
                          const liscenceTypeResponse: LiscenceTypeResponseModel = new LiscenceTypeResponseModel(true, 10115, 'Liscence Type is deactivated successfully');
                          return liscenceTypeResponse;
                      } else {
                          throw new LiscenceTypeResponseModel(false,10111, 'Liscence Type is already deactivated');
                      }
                  } else {
                      if (liscenceTypeStatus.affected) {
                          const liscenceTypeResponse: LiscenceTypeResponseModel = new LiscenceTypeResponseModel(true, 10114, 'Liscence Type is activated successfully');
                          return liscenceTypeResponse;
                      } else {
                          throw new LiscenceTypeResponseModel(false,10112, 'Liscence Type is already  activated');
                      }
                  }
              // }
          }
      } else {
          throw new LiscenceTypeResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveLiscenceTypeById(lisceneTypeReq: LiscenceTypeRequest): Promise<LiscenceTypeResponseModel> {
  try {
      const liscenceTypeEntities: LiscenceType = await this.liscenceTypeRepository.findOne({
        where:{liscenceTypeId:lisceneTypeReq.liscenceTypeId}
        });
        
        const liscenceTypeData: LiscenceTypeDTO = this.liscenceTypeAdapter.convertEntityToDto(liscenceTypeEntities);
        if (liscenceTypeData) {
            const response = new LiscenceTypeResponseModel(true, 11101 , 'Liscence Type retrieved Successfully',[liscenceTypeData]);
            return response;
        }
        else{
            throw new LiscenceTypeResponseModel(false,11106,'Something went wrong');
        }
  } catch (err) {
      return err;
  }
}

async getLiscenceTypeById(liscenceTypeId: number): Promise<LiscenceType> {
      const Response = await this.liscenceTypeRepository.findOne({
      where: {liscenceTypeId: liscenceTypeId},
      });
      
      if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}