import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllDepartmentsResponseModel } from '@project-management-system/shared-models';
import { DepartmentResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { DepartmentsAdapter } from './dto/departments.adapter';
import { Departments } from './departments.entity';
import { DepartmentRequest } from './dto/departments.request';
import { DepartmentsDTO } from './dto/departments.dto';
import { Console } from 'console';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';

@Injectable()
export class DepartmentService{
    constructor(
        @InjectRepository(Departments)

        private departmentRepository: Repository<Departments>,
        private departmentAdapter: DepartmentsAdapter,
      ){}
      async getDepartmentWithoutRelations(depart: string): Promise<Departments>{
        const departmentResponse = await this.departmentRepository.findOne({
          where: {deptName: Raw(alias => `dept_name = '${depart}'`)},
        });
        if(departmentResponse){
          return departmentResponse;
        }
        else{
          return null;
        }
      }



    async createDepartment(departDto: DepartmentsDTO, isUpdate: boolean): Promise<DepartmentResponseModel> {
        // console.log(departDto,'_____________________')
        try {
          if (!isUpdate) {
            const existingDept = await this.departmentRepository.findOne({ where: { deptName: departDto.deptName } });
            if (existingDept) {
              throw new DepartmentResponseModel(false, 11104, 'Department already exists');
            }
          } else {
            const departmentByName = await this.departmentRepository.findOne({ where: { deptName: departDto.deptName } });
            const departById = await this.departmentRepository.findOne({ where: { deptId: departDto.deptId } });
            
            if (departmentByName && departById.deptId !== departDto.deptId) {
              throw new DepartmentResponseModel(false, 11104, 'Department name already exists');
            }
            
            if (!departDto || !departById) {
              throw new ErrorResponse(11104, 'Given Department does not exist');
            }
          }
          
          const convertedDepartment: Departments = this.departmentAdapter.convertDtoToEntity(departDto, isUpdate);
          const savedDepartmentEntity: Departments = await this.departmentRepository.save(convertedDepartment);
          // console.log(savedDepartmentEntity,'-------agni-----------')
          const savedDepartmentDto: DepartmentsDTO = this.departmentAdapter.convertEntityToDto(savedDepartmentEntity);
          // console.log(savedDepartmentDto,'----------jamadhagmi-------------------')
          
          if (savedDepartmentDto) {
            const response = new DepartmentResponseModel(true, 1, isUpdate ? 'Department Updated Successfully' : 'Department Created Successfully');
            return response;
          } else {
            throw new DepartmentResponseModel(false, 11106, 'Department saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      



    async getAllDepartments(): Promise<AllDepartmentsResponseModel> {
        // const page: number = 1;
        // const response = new AllPaymentResponseModel();
        try {
          const departDTO: DepartmentsDTO[] = [];
          //retrieves all companies
          const DepartmentEntity: Departments[] = await this.departmentRepository.find({ order :{'deptName':'ASC'}});
          //console.log(statesEntities);
          if (DepartmentEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            DepartmentEntity.forEach(DepartmentEntity => {
              const convertedDepartmentDto: DepartmentsDTO = this.departmentAdapter.convertEntityToDto(
                DepartmentEntity
              );
              departDTO.push(convertedDepartmentDto);
            });
    
            //generated response
  
            const response = new AllDepartmentsResponseModel(true,1,'Department retrieved successfully',departDTO);
          //  if(req?.createdUser){
          // //   const newLogDto = new LogsDto(1,'view', 'ProfitCenter', 0, true, 'Profit Center retrieved successfully',req.createdUser,'','',)
          // //   let res = await this.logService.createLog(newLogDto);
          // //   console.log(res);
          //  }
            return response;
          } else {
            throw new DepartmentResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveDepartments(): Promise<AllDepartmentsResponseModel> {
        // const page: number = 1;
        // const response = new AllProfitCenterResponseModel();
        try {
          const departmentDTO: DepartmentsDTO[] = [];
          //retrieves all companies
          const DepartmentEntity: Departments[] = await this.departmentRepository.find({where:{"isActive":true},order :{'deptName':'ASC'}});
          //console.log(statesEntities);
          
          if (DepartmentEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            DepartmentEntity.forEach(DepartmentEntity => {
              const convertedDepartDto: DepartmentsDTO = this.departmentAdapter.convertEntityToDto(
                DepartmentEntity
              );
              departmentDTO.push(convertedDepartDto);
            });
    
            //generated response
  
            const response = new AllDepartmentsResponseModel(true,1,'Department retrieved successfully',departmentDTO);
            return response;
          } else {
            throw new DepartmentResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      
      async activateOrDeactivateDepartment(profitReq: DepartmentRequest): Promise<DepartmentResponseModel> {
        try {
            const deptExists = await this.getDepartmentById(profitReq.deptId);
            if (deptExists) {
                if (!deptExists) {
                    throw new DepartmentResponseModel(false,10113, 'Someone updated the current  Department information.Refresh and try again');
                } else {
                    
                        const DepartmentStatus =  await this.departmentRepository.update(
                            { deptId: profitReq.deptId },
                            { isActive: profitReq.isActive,updatedUser: profitReq.updatedUser });
                       
                        if (deptExists.isActive) {
                            if (DepartmentStatus.affected) {
                                const DepartmentResponse: DepartmentResponseModel = new DepartmentResponseModel(true, 10115, 'Department is Deactivated successfully');
                                return DepartmentResponse;
                            } else {
                                throw new DepartmentResponseModel(false,10111, 'Department  is already Deactivated');
                            }
                        } else {
                            if (DepartmentStatus.affected) {
                                const DepartResponse: DepartmentResponseModel = new DepartmentResponseModel(true, 10114, 'Department  is Activated successfully');
                                return DepartResponse;
                            } else {
                                throw new DepartmentResponseModel(false,10112, 'Department is already  Activated');
                            }
                        }
                    // }
                }
            } else {
                throw new DepartmentResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveDepartmentById(profitReq: DepartmentRequest): Promise<DepartmentResponseModel> {
        try {
            //retrieves all companies
            const DepartmentEntities: Departments = await this.departmentRepository.findOne({
              where:{deptId:profitReq.deptId}
              });
                            const departHead: DepartmentsDTO = this.departmentAdapter.convertEntityToDto(DepartmentEntities);
              if (departHead) {
                  const response = new DepartmentResponseModel(true, 11101 , 'Department   retrived Successfully');
                  return response;
              }
              else{
                  throw new DepartmentResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getDepartmentById(deptId: number): Promise<Departments> {
        //  console.log(employeeId);
            const Response = await this.departmentRepository.findOne({
            where: {deptId: deptId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 
}