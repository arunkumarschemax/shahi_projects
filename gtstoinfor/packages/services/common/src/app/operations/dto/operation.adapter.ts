import { Injectable } from "@nestjs/common";
import { OperationDTO } from "./operations.dto";
import { Operations } from "../operation.entity";

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
    operations.operationId = operationsDto.operationId;
    operations.operationName = operationsDto.operationName;
    operations.operationCode = operations.operationCode;
    operations.isActive = operationsDto.isActive == undefined?true:operationsDto.isActive;
    if(isUpdate){
        operations.updatedUser = operations.updatedUser;
    } else {
        operations.isActive = true;
        operations.createdUser = operationsDto.createdUser;
    }
    return operations;
  }
  public convertEntityToDto(operationsObject: Operations): OperationDTO {
    const operationsDto = new OperationDTO();
    operationsDto.operationId = operationsObject.operationId;
    operationsDto.operationName = operationsObject.operationName;
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