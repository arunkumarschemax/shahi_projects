import { Injectable } from '@nestjs/common';

import { Division } from '../division.entity';
import { DivisionDTO } from './division.dto';

@Injectable()
export class DivisionAdapter {
  /**
   * 
   * @param DivisionDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  divisionDto: DivisionDTO,  isUpdate: boolean = false ): Division {
    const Divisions = new Division();
    Divisions.divisionId=divisionDto.divisionId;
    Divisions.divisionName=divisionDto.divisionName;
    Divisions.divisionCode = divisionDto.divisionCode;
    Divisions.companyId= divisionDto.companyId;
    // Division.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    Divisions.isActive=divisionDto.isActive==undefined?true:divisionDto.isActive;
    if (isUpdate) {
        Divisions.updatedUser = divisionDto.updatedUser;
    } else {
        Divisions.isActive = true;
        Divisions.createdUser = divisionDto.createdUser;
    }
   return Divisions;
  }
  public convertEntityToDto(DivisionObject: Division): DivisionDTO {
    const DivisionDto= new DivisionDTO;
    DivisionDto.divisionId=DivisionObject.divisionId;
    DivisionDto.divisionName=DivisionObject.divisionName;
    DivisionDto.divisionCode = DivisionObject.divisionCode;
    DivisionDto.companyId = DivisionObject.companyId;
    DivisionDto.isActive = DivisionObject.isActive;
    DivisionDto.createdAt = DivisionObject.createdAt;
    DivisionDto.updatedAt = DivisionObject.updatedAt;
    DivisionDto.createdUser = DivisionObject.createdUser;
    DivisionDto.updatedUser = DivisionObject.updatedUser;
    DivisionDto.versionFlag = DivisionObject.versionFlag;
    return DivisionDto;
  }
}
