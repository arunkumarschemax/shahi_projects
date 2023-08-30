import { Injectable } from '@nestjs/common';
import { Departments } from '../departments.entity';
import { DepartmentsDTO } from './departments.dto';
@Injectable()
export class DepartmentsAdapter {
  /**
   *
   * @param DepartmentsDto
   * @returns Departments entity
   */
  public convertDtoToEntity(  departmentsDTO: DepartmentsDTO,  isUpdate: boolean ): Departments {
    const department = new Departments();
    department.deptId=departmentsDTO.deptId;
    department.deptName=departmentsDTO.deptName;
    department.deptHead=departmentsDTO.deptHead
    department.isActive=departmentsDTO.isActive==undefined?true:departmentsDTO.isActive;
    if (isUpdate) {
      department.updatedUser = departmentsDTO.createdUser;
    } else {
      department.isActive = true;
      department.createdUser = departmentsDTO.createdUser;
    }
   return department;
  }
  public convertEntityToDto(departmentsObject: Departments): DepartmentsDTO {
    const departmentsDTO= new DepartmentsDTO;
    departmentsDTO.deptId = departmentsObject.deptId;
    departmentsDTO.deptName = departmentsObject.deptName;
    departmentsDTO.deptHead = departmentsObject.deptHead;
    departmentsDTO.isActive = departmentsObject.isActive;
    departmentsDTO.createdAt = departmentsObject.createdAt;
    departmentsDTO.updatedAt = departmentsObject.updatedAt;
    departmentsDTO.createdUser = departmentsObject.createdUser;
    departmentsDTO.updatedUser = departmentsObject.updatedUser;
    departmentsDTO.versionFlag = departmentsObject.versionFlag;
    return departmentsDTO;
  }
}
