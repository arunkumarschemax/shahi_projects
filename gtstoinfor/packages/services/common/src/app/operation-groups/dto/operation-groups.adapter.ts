import { Injectable } from '@nestjs/common';
import { OperationGroupsDto } from './operation-groups.dto';
import { OperationGroups } from '../operation-groups.entity';

@Injectable()
export class OperationGroupsAdapter {
  /**
   * 
   * @param opeartionGroupsDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  operationGroupsDto: OperationGroupsDto,  isUpdate: boolean = false ): OperationGroups {
    const operationGroups = new OperationGroups();
    operationGroups.operationGroupCode = operationGroupsDto.operationGroupCode;
    operationGroups.operationGroupName = operationGroupsDto.operationGroupName;
    operationGroups.isActive=operationGroupsDto.isActive==undefined?true:operationGroupsDto.isActive;
    if (isUpdate) {
        operationGroups.operationGroupId = operationGroupsDto.operationGroupId
        operationGroups.updatedUser = operationGroupsDto.updatedUser;
    } else {
        // operationGroups.isActive = true;
        operationGroups.createdUser = operationGroupsDto.createdUser;
    }
   return operationGroups;
  }
  public convertEntityToDto(operationGroupsObject: OperationGroups): OperationGroupsDto {
    const operationGroupsDto= new OperationGroupsDto;
    operationGroupsDto.operationGroupId = operationGroupsObject.operationGroupId
    operationGroupsDto.operationGroupCode=operationGroupsObject.operationGroupCode;
    operationGroupsDto.operationGroupName=operationGroupsObject.operationGroupName;
    operationGroupsDto.isActive = operationGroupsObject.isActive;
    operationGroupsDto.createdAt = operationGroupsObject.createdAt;
    operationGroupsDto.updatedAt = operationGroupsObject.updatedAt;
    operationGroupsDto.createdUser = operationGroupsObject.createdUser;
    operationGroupsDto.updatedUser = operationGroupsObject.updatedUser;
    operationGroupsDto.versionFlag = operationGroupsObject.versionFlag;
    return operationGroupsDto;
  }
}
