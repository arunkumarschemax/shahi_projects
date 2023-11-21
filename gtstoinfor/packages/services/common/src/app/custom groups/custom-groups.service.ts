import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CustomGroups } from './custom-groups.entity';
import { CustomGroupsAdapter } from './dto/custom-groups.adapter';
import { CustomGroupsDTO } from './dto/custom-groups.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { CustomGroupsRequest } from './dto/custom-groups.request';
import { AllCustomGroupsResponseModel, CustomGroupsResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class CustomGroupsService {
  
    constructor(
        @InjectRepository(CustomGroups)
        private customGroupsRepository: Repository<CustomGroups>,
        private customGroupsAdapter: CustomGroupsAdapter,
      ){}

      async getCustomGroupWithoutRelations( customGroup: string): Promise<CustomGroups>{
        const customGroupResponse = await this.customGroupsRepository.findOne({
          where: {customGroup: Raw(alias => `custom_groups = '${customGroup}'`)},
        });
        if(customGroupResponse){
          return customGroupResponse;
        }
        else{
          return null;
        }
      }

      async createCustomGroup(dto: CustomGroupsDTO, isUpdate: boolean): Promise<CustomGroupsResponseModel> {
        try {
          let previousValue;
            const customGroupsEntity = await this.customGroupsRepository.findOne({ where: { customGroup: dto.customGroup } });
            if (customGroupsEntity) {
              throw new CustomGroupsResponseModel(false, 11104, 'Custom Group already exists');
            }
            if(isUpdate){
            const certificatePrevious = await this.customGroupsRepository.findOne({ where: { customGroupId: dto.customGroupId } });
            if (!certificatePrevious) {
              throw new ErrorResponse(0, 'Given Custom does not exist');
            }
            previousValue = certificatePrevious.customGroup;
          }
          const convertedCustomGroup: CustomGroups = this.customGroupsAdapter.convertDtoToEntity(dto, isUpdate);
          const savedCustomGroupEntity: CustomGroups = await this.customGroupsRepository.save(convertedCustomGroup);
          const savedCustomGroupDto: CustomGroupsDTO = this.customGroupsAdapter.convertEntityToDto(savedCustomGroupEntity);
          
          if (savedCustomGroupDto) {
            const response = new CustomGroupsResponseModel(true, 1, isUpdate ? 'Custom Groups Updated Successfully' : 'Custom Groups Created Successfully');
            return response;
          } else {
            throw new CustomGroupsResponseModel(false, 11106, 'Custom Groups saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      
      

    async getAllCustomGroups(): Promise<AllCustomGroupsResponseModel> {
      try {
        const customGroupDTO: CustomGroups[] = [];
        const customGroupEntity: CustomGroups[] = await this.customGroupsRepository.find({ 
          order :{customGroup:'ASC'}});
        if (customGroupEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          customGroupEntity.forEach(customGroupEntity => {
            const convertedCustomGroupDto: CustomGroupsDTO = this.customGroupsAdapter.convertEntityToDto(
              customGroupEntity
            );
            customGroupDTO.push(convertedCustomGroupDto);
          });
          //generated response
          const response = new AllCustomGroupsResponseModel(true,1,'Custom Groups retrieved successfully',customGroupDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveCustomGroups(): Promise<AllCustomGroupsResponseModel> {
      try {
        const customGroupDTO: CustomGroupsDTO[] = [];
        const customGroupEntity: CustomGroups[] = await this.customGroupsRepository.find({where:{"isActive":true},order :{customGroup:'ASC'}});
        if (customGroupEntity) {
          customGroupEntity.forEach(customGroupEntity => {
            const convertedCustomGroupDto: CustomGroupsDTO = this.customGroupsAdapter.convertEntityToDto(
              customGroupEntity
            );
            customGroupDTO.push(convertedCustomGroupDto);
          });
          const response = new AllCustomGroupsResponseModel(true,1,'CustomGroups retrieved successfully',customGroupDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateCustomGroup(customGroupReq: CustomGroupsRequest): Promise<CustomGroupsResponseModel> {
  try {
      const customGroupExists = await this.getCustomGroupById(customGroupReq.customGroupId);
      if (customGroupExists) {
          if (!customGroupExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Custom Group information. Refresh and try again');
          } else {
                  const CustomGroupStatus =  await this.customGroupsRepository.update(
                      { customGroupId: customGroupReq.customGroupId },
                      { isActive: customGroupReq.isActive,updatedUser: customGroupReq.updatedUser });
                 
                  if (customGroupExists.isActive) {
                      if (CustomGroupStatus.affected) {
                          const CustomGroupResponse: CustomGroupsResponseModel = new CustomGroupsResponseModel(true, 10115, 'Custom Group is Deactivated successfully');
                          return CustomGroupResponse;
                      } else {
                          throw new CustomGroupsResponseModel(false,10111, 'Custom Group is already Deactivated');
                      }
                  } else {
                      if (CustomGroupStatus.affected) {
                          const CustomGroupResponse: CustomGroupsResponseModel = new CustomGroupsResponseModel(true, 10114, 'Custom Group is Activated successfully');
                          return CustomGroupResponse;
                      } else {
                          throw new CustomGroupsResponseModel(false,10112, 'Custom Group is already  Activated');
                      }
                  }
              // }
          }
      } else {
          throw new CustomGroupsResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveCustomGroupById(customGroupReq: CustomGroupsRequest): Promise<CustomGroupsResponseModel> {
  try {
      //retrieves all companies
      const customGroupEntities: CustomGroups = await this.customGroupsRepository.findOne({
        where:{customGroupId:customGroupReq.customGroupId}
        });
        
        const customGroupData: CustomGroupsDTO = this.customGroupsAdapter.convertEntityToDto(customGroupEntities);
        if (customGroupData) {
            const response = new CustomGroupsResponseModel(true, 11101 , 'Custom Group retrieved Successfully',[customGroupData]);
            return response;
        }
        else{
            throw new CustomGroupsResponseModel(false,11106,'Something went wrong');
        }
        // generating resposnse
  } catch (err) {
      return err;
  }
}

async getCustomGroupById(customGroupId: number): Promise<CustomGroups> {
  //  console.log(employeeId);
      const Response = await this.customGroupsRepository.findOne({
      where: {customGroupId: customGroupId},
      });
      // console.log(employeeResponse);
      if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}