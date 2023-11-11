import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Commission } from './commission.entity';
import { CommissionAdapter } from './dto/commission.adapter';
import { CommissionDTO } from './dto/commission.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { CommissionRequest } from './dto/commission.request';
import { AllCommissionResponseModel, CommissionResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class CommissionService {
  
    constructor(
        @InjectRepository(Commission)
        private commissionRepository: Repository<Commission>,
        private commissionAdapter: CommissionAdapter,
      ){}

      async getCommissionWithoutRelations( commission: string): Promise<Commission>{
        const commissionResponse = await this.commissionRepository.findOne({
          where: {commission: Raw(alias => `commission = '${commission}'`)},
        });
        if(commissionResponse){
          return commissionResponse;
        }
        else{
          return null;
        }
      }

      async createCommission(dto: CommissionDTO, isUpdate: boolean): Promise<CommissionResponseModel> {
        try {
          let previousValue;
            const entity = await this.commissionRepository.findOne({ where: { commission: dto.commission } });
            if (entity) {
              throw new CommissionResponseModel(false, 11104, 'Commission already exists');
            }
            if(isUpdate){
            const certificatePrevious = await this.commissionRepository.findOne({ where: { commissionId: dto.commissionId } });
            if (!certificatePrevious) {
              throw new ErrorResponse(0, 'Given Commission does not exist');
            }
            previousValue = certificatePrevious.commission;
          }
          const convertedEntity: Commission = this.commissionAdapter.convertDtoToEntity(dto, isUpdate);
          const savedEntity: Commission = await this.commissionRepository.save(convertedEntity);
          const savedDto: CommissionDTO = this.commissionAdapter.convertEntityToDto(savedEntity);
          
          if (savedDto) {
            const response = new CommissionResponseModel(true, 1, isUpdate ? 'Commission Updated Successfully' : 'Commission Created Successfully');
            return response;
          } else {
            throw new CommissionResponseModel(false, 11106, 'Commission saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      
      

    async getAllCommissions(): Promise<AllCommissionResponseModel> {
      try {
        const dto: CommissionDTO[] = [];
        const entity: Commission[] = await this.commissionRepository.find();
        if (entity) {
          entity.forEach(commissionEntity => {
            const convertedDto: CommissionDTO = this.commissionAdapter.convertEntityToDto(
              commissionEntity
            );
            dto.push(convertedDto);
          });
          const response = new AllCommissionResponseModel(true,1,'Commission retrieved successfully',dto);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveCommission(): Promise<AllCommissionResponseModel> {
      try {
        const dto: CommissionDTO[] = [];
        const entity: Commission[] = await this.commissionRepository.find({where:{"isActive":true},order :{commission:'ASC'}});
        if (entity) {
          entity.forEach(commissionEntity => {
            const convertedDto: CommissionDTO = this.commissionAdapter.convertEntityToDto(
              commissionEntity
            );
            dto.push(convertedDto);
          });
          const response = new AllCommissionResponseModel(true,1,'Commission retrieved successfully',dto);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateCommission(req: CommissionRequest): Promise<CommissionResponseModel> {
  try {
      const commissionExists = await this.getCommissionById(req.commissionId);
      if (commissionExists) {
          if (!commissionExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Commission information. Refresh and try again');
          } else {
                  const commissionStatus =  await this.commissionRepository.update(
                      { commissionId: req.commissionId },
                      { isActive: req.isActive,updatedUser: req.updatedUser });
                 
                  if (commissionExists.isActive) {
                      if (commissionStatus.affected) {
                          const commissionResponse: CommissionResponseModel = new CommissionResponseModel(true, 10115, 'Commission is Deactivated successfully');
                          return commissionResponse;
                      } else {
                          throw new CommissionResponseModel(false,10111, 'Commission is already Deactivated');
                      }
                  } else {
                      if (commissionStatus.affected) {
                          const commissionResponse: CommissionResponseModel = new CommissionResponseModel(true, 10114, 'Commission is Activated successfully');
                          return commissionResponse;
                      } else {
                          throw new CommissionResponseModel(false,10112, 'Commission is already  Activated');
                      }
                  }
          }
      } else {
          throw new CommissionResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveCommissionById( req: CommissionRequest): Promise<CommissionResponseModel> {
  try {
      const entity: Commission = await this.commissionRepository.findOne({
        where:{commissionId: req.commissionId}
        });
        
        const data: CommissionDTO = this.commissionAdapter.convertEntityToDto(entity);
        if (data) {
            const response = new CommissionResponseModel(true, 11101 , 'Commission retrieved Successfully',[data]);
            return response;
        }
        else{
            throw new CommissionResponseModel(false,11106,'Something went wrong');
        }
  } catch (err) {
      return err;
  }
}

async getCommissionById(commissionId: number): Promise<Commission> {
      const Response = await this.commissionRepository.findOne({
      where: {commissionId: commissionId},
      });
     if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}