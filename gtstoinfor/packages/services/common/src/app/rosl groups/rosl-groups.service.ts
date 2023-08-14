import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { ROSLGroups } from './rosl-groups.entity';
import { ROSLGroupsAdapter } from './dto/rosl-groups.adapter';
import { ROSLGroupsDTO } from './dto/rosl-groups.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { ROSLGroupsRequest } from './dto/rosl-groups.request';
import { AllROSLGroupsResponseModel, ROSLGroupsResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class ROSLGroupsService {
  
    constructor(
        @InjectRepository(ROSLGroups)
        private roslGroupsRepository: Repository<ROSLGroups>,
        private roslGroupsAdapter: ROSLGroupsAdapter,
      ){}

      async getROSLGroupWithoutRelations( roslGroup: string): Promise<ROSLGroups>{
        const roslGroupResponse = await this.roslGroupsRepository.findOne({
          where: {roslGroup: Raw(alias => `rosl_groups = '${roslGroup}'`)},
        });
        if(roslGroupResponse){
          return roslGroupResponse;
        }
        else{
          return null;
        }
      }

      async createROSLGroup(dto: ROSLGroupsDTO, isUpdate: boolean): Promise<ROSLGroupsResponseModel> {
        try {
          let previousValue;
            const roslGroupsEntity = await this.roslGroupsRepository.findOne({ where: { roslGroup: dto.roslGroup } });
            if (roslGroupsEntity) {
              throw new ROSLGroupsResponseModel(false, 11104, 'ROSL Group already exists');
            }
            if(isUpdate){
            const certificatePrevious = await this.roslGroupsRepository.findOne({ where: { roslGroupId: dto.roslGroupId } });
            if (!certificatePrevious) {
              throw new ErrorResponse(0, 'Given ROSL does not exist');
            }
            previousValue = certificatePrevious.roslGroup;
          }
          const convertedROSLGroup: ROSLGroups = this.roslGroupsAdapter.convertDtoToEntity(dto, isUpdate);
          const savedROSLGroupEntity: ROSLGroups = await this.roslGroupsRepository.save(convertedROSLGroup);
          const savedROSLGroupDto: ROSLGroupsDTO = this.roslGroupsAdapter.convertEntityToDto(savedROSLGroupEntity);
          
          if (savedROSLGroupDto) {
            const response = new ROSLGroupsResponseModel(true, 1, isUpdate ? 'ROSL Groups Updated Successfully' : 'ROSL Groups Created Successfully');
            return response;
          } else {
            throw new ROSLGroupsResponseModel(false, 11106, 'ROSL Groups saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      
      

    async getAllROSLGroups(): Promise<AllROSLGroupsResponseModel> {
      try {
        const roslGroupDTO: ROSLGroups[] = [];
        const roslGroupEntity: ROSLGroups[] = await this.roslGroupsRepository.find({ 
          order :{roslGroup:'ASC'}});
        if (roslGroupEntity) {
          roslGroupEntity.forEach(roslGroupEntity => {
            const convertedROSLGroupDto: ROSLGroupsDTO = this.roslGroupsAdapter.convertEntityToDto(
              roslGroupEntity
            );
            roslGroupDTO.push(convertedROSLGroupDto);
          });
          const response = new AllROSLGroupsResponseModel(true,1,'ROSL Groups retrieved successfully',roslGroupDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveROSLGroups(): Promise<AllROSLGroupsResponseModel> {
      try {
        const ROSLGroupDTO: ROSLGroupsDTO[] = [];
        const ROSLGroupEntity: ROSLGroups[] = await this.roslGroupsRepository.find({where:{"isActive":true},order :{roslGroup:'ASC'}});
        if (ROSLGroupEntity) {
          ROSLGroupEntity.forEach(ROSLGroupEntity => {
            const convertedROSLGroupDto: ROSLGroupsDTO = this.roslGroupsAdapter.convertEntityToDto(
              ROSLGroupEntity
            );
            ROSLGroupDTO.push(convertedROSLGroupDto);
          });
          const response = new AllROSLGroupsResponseModel(true,1,'ROSL Groups retrieved successfully',ROSLGroupDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateROSLGroup(req: ROSLGroupsRequest): Promise<ROSLGroupsResponseModel> {
  try {
      const roslGroupExists = await this.getROSLGroupById(req.roslGroupId);
      if (roslGroupExists) {
          if (!roslGroupExists) {
              throw new ErrorResponse(10113, 'Someone updated the current ROSL Group information. Refresh and try again');
          } else {
                  const roslGroupStatus =  await this.roslGroupsRepository.update(
                      { roslGroupId: req.roslGroupId },
                      { isActive: req.isActive,updatedUser: req.updatedUser });
                 
                  if (roslGroupExists.isActive) {
                      if (roslGroupStatus.affected) {
                          const roslGroupResponse: ROSLGroupsResponseModel = new ROSLGroupsResponseModel(true, 10115, 'rosl Group is de-activated successfully');
                          return roslGroupResponse;
                      } else {
                          throw new ROSLGroupsResponseModel(false,10111, 'rosl Group is already deactivated');
                      }
                  } else {
                      if (roslGroupStatus.affected) {
                          const roslGroupResponse: ROSLGroupsResponseModel = new ROSLGroupsResponseModel(true, 10114, 'rosl Group is activated successfully');
                          return roslGroupResponse;
                      } else {
                          throw new ROSLGroupsResponseModel(false,10112, 'rosl Group is already  activated');
                      }
                  }
          }
      } else {
          throw new ROSLGroupsResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveROSLGroupById( req: ROSLGroupsRequest): Promise<ROSLGroupsResponseModel> {
  try {
      const ROSLGroupEntities: ROSLGroups = await this.roslGroupsRepository.findOne({
        where:{roslGroupId: req.roslGroupId}
        });
        
        const ROSLGroupData: ROSLGroupsDTO = this.roslGroupsAdapter.convertEntityToDto(ROSLGroupEntities);
        if (ROSLGroupData) {
            const response = new ROSLGroupsResponseModel(true, 11101 , 'ROSL Group retrieved Successfully',[ROSLGroupData]);
            return response;
        }
        else{
            throw new ROSLGroupsResponseModel(false,11106,'Something went wrong');
        }
  } catch (err) {
      return err;
  }
}

async getROSLGroupById(roslGroupId: number): Promise<ROSLGroups> {
      const Response = await this.roslGroupsRepository.findOne({
      where: {roslGroupId: roslGroupId},
      });
     if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}