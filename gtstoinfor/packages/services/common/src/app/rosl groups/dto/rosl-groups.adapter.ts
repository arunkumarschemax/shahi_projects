import {Injectable} from '@nestjs/common';
import { ROSLGroupsDTO } from './rosl-groups.dto';
import { ROSLGroups } from '../rosl-groups.entity';

@Injectable()
export class ROSLGroupsAdapter {
    /**
     * 
     * @param roslGroupsDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  roslGroupsDTO: ROSLGroupsDTO,  isUpdate: boolean = false ): ROSLGroups {
        const roslGroups = new ROSLGroups();
        roslGroups.roslGroup = roslGroupsDTO.roslGroup;
        roslGroups.isActive = roslGroupsDTO.isActive == undefined?true:roslGroupsDTO.isActive;
        if (isUpdate) {
            roslGroups.roslGroupId=roslGroupsDTO.roslGroupId;
            roslGroups.updatedUser = roslGroupsDTO.updatedUser;
        } else {
            roslGroups.isActive = true;
            roslGroups.createdUser = roslGroupsDTO.createdUser;
        }
       return roslGroups;
      }
      
      public convertEntityToDto(roslGroupsData: ROSLGroups): ROSLGroupsDTO {
        const roslGroupsDto = new ROSLGroupsDTO;
        roslGroupsDto.roslGroupId=roslGroupsData.roslGroupId;
        roslGroupsDto.roslGroup=roslGroupsData.roslGroup;
        roslGroupsDto.isActive = roslGroupsData.isActive;
        roslGroupsDto.createdAt = roslGroupsData.createdAt;
        roslGroupsDto.updatedAt = roslGroupsData.updatedAt;
        roslGroupsDto.createdUser = roslGroupsData.createdUser;
        roslGroupsDto.updatedUser = roslGroupsData.updatedUser;
        roslGroupsDto.versionFlag = roslGroupsData.versionFlag;
        return roslGroupsDto;
      }
}