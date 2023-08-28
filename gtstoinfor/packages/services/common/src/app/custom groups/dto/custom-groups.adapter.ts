import {Injectable} from '@nestjs/common';
import { CustomGroupsDTO } from './custom-groups.dto';
import { CustomGroups } from '../custom-groups.entity';

@Injectable()
export class CustomGroupsAdapter {
    /**
     * 
     * @param CustomGroupsDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  customGroupsDTO: CustomGroupsDTO,  isUpdate: boolean = false ): CustomGroups {
        const customGroups = new CustomGroups();
        customGroups.customGroup = customGroupsDTO.customGroup;
        customGroups.isActive = customGroupsDTO.isActive==undefined?true:customGroupsDTO.isActive;
        if (isUpdate) {
            customGroups.customGroupId=customGroupsDTO.customGroupId;
            customGroups.updatedUser = customGroupsDTO.updatedUser;
        } else {
            customGroups.isActive = true;
            customGroups.createdUser = customGroupsDTO.createdUser;
        }
       return customGroups;
      }
      
      public convertEntityToDto(customGroupsData: CustomGroups): CustomGroupsDTO {
        const customGroupsDto = new CustomGroupsDTO;
        customGroupsDto.customGroupId=customGroupsData.customGroupId;
        customGroupsDto.customGroup=customGroupsData.customGroup;
        customGroupsDto.isActive = customGroupsData.isActive;
        customGroupsDto.createdAt = customGroupsData.createdAt;
        customGroupsDto.updatedAt = customGroupsData.updatedAt;
        customGroupsDto.createdUser = customGroupsData.createdUser;
        customGroupsDto.updatedUser = customGroupsData.updatedUser;
        customGroupsDto.versionFlag = customGroupsData.versionFlag;
        return customGroupsDto;
      }
}