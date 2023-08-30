
import { Injectable } from "@nestjs/common";
import { OperationGroups } from "../../operation-groups/operation-groups.entity";
import { AccountControlObjectDto } from "./account-control-object-dto";
import { AccountControlObject } from "../account-control-objects-entity";
import { ProfitControlHead } from "../../profit-control-head/profit-control-head-entity";

@Injectable()
export class AccountControlObjectAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( operationsDto: AccountControlObjectDto, isUpdate: boolean = false): AccountControlObject {
    const operations = new AccountControlObject();
    const operationgroup = new ProfitControlHead()
    operations.accountControlObjectsName = operationsDto.accountControlObjectsName;
    operationgroup.profitControlHeadId = operationsDto.profitControlHeadId
    operationgroup.profitControlHead= operationsDto.profitControlHead
    operations.pch = operationgroup
    operations.isActive = operationsDto.isActive == undefined?true:operationsDto.isActive;
    if(isUpdate){
      operations.accountControlObjectsId = operationsDto.accountControlObjectsId;
        operations.updatedUser = operations.updatedUser;
    } else {
        operations.isActive = true;
        operations.createdUser = operationsDto.createdUser;
    }
    return operations;
  }
  public convertEntityToDto(operationsObject: AccountControlObject): AccountControlObjectDto {
    const operationsDto = new AccountControlObjectDto();
    operationsDto.accountControlObjectsId = operationsObject.accountControlObjectsId;
    operationsDto.accountControlObjectsName = operationsObject.accountControlObjectsName;
    operationsDto.profitControlHeadId = (operationsObject.pch)?.profitControlHeadId;
    operationsDto.profitControlHead = (operationsObject.pch)?.profitControlHead;
    operationsDto.isActive = operationsObject.isActive;
    operationsDto.createdAt = operationsObject.createdAt;
    operationsDto.createdUser = operationsObject.createdUser;
    operationsDto.updatedAt = operationsObject.updatedAt;
    operationsDto.updatedUser = operationsObject.updatedUser;
    operationsDto.versionFlag = operationsObject.versionFlag;
    return operationsDto;
  }
}