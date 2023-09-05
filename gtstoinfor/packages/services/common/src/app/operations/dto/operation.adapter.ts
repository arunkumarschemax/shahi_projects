import { Injectable } from "@nestjs/common";
import { OperationDTO } from "./operations.dto";
import { Operations } from "../operation.entity";
import { OperationGroups } from "../../operation-groups/operation-groups.entity";

@Injectable()
export class OperationsAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( operationsDto: OperationDTO, isUpdate: boolean = false): Operations {
    const operations = new Operations();
    const operationgroup = new OperationGroups()
    operations.operationName = operationsDto.operationName;
    operations.operationCode = operationsDto.operationCode;
    operationgroup.operationGroupId = operationsDto.operationGroupId
    operationgroup.operationGroupName= operationsDto.operationGroupName
    operations.operationGroupInfo = operationgroup
    operations.isActive = operationsDto.isActive == undefined?true:operationsDto.isActive;
    if(isUpdate){
      operations.operationId = operationsDto.operationId;
        operations.updatedUser = operations.updatedUser;
    } else {
        operations.isActive = true;
        operations.createdUser = operationsDto.createdUser;
    }
    return operations;
  }
  public convertEntityToDto(operationsObject: Operations,index?:number): OperationDTO {
    const operationsDto = new OperationDTO();
    operationsDto.key = index+1
    operationsDto.operationId = operationsObject.operationId;
    operationsDto.operationName = operationsObject.operationName;
    operationsDto.operationGroupId = (operationsObject.operationGroupInfo)?.operationGroupId;
    operationsDto.operationGroupName = (operationsObject.operationGroupInfo)?.operationGroupName;
    operationsDto.isActive = operationsObject.isActive;
    operationsDto.createdAt = operationsObject.createdAt;
    operationsDto.createdUser = operationsObject.createdUser;
    operationsDto.operationCode = operationsObject.operationCode;
    operationsDto.updatedAt = operationsObject.updatedAt;
    operationsDto.updatedUser = operationsObject.updatedUser;
    operationsDto.versionFlag = operationsObject.versionFlag;
    return operationsDto;
  }
}