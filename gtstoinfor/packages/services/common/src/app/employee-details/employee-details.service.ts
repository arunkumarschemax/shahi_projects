import { Inject, Injectable } from '@nestjs/common';

import { EmployeeDetailsRepo } from './dto/employee-detail-repository';
import { AllEmployeeDetailsResponseModel } from '@project-management-system/shared-models';
import { EmplyeeDetails } from './dto/employee-details-entity';
import { EmployeeIdReq } from './dto/employee-id-req';
import { EmployeeDetailsResponse } from './dto/employee-details-request';
import { DepartmentReq } from './dto/department-name.req';

@Injectable()
export class EmployeeDetailsService {
    constructor(
        private employeeDetailsRepo: EmployeeDetailsRepo,
        // private departmentRepo : DepartmentRepo,
    ) { }
    
    async createEmployee(req: EmployeeDetailsResponse, isUpdate: boolean): Promise<AllEmployeeDetailsResponseModel> {
        try {
            console.log(isUpdate,'updateEmployee')
            console.log(req,'reqqq')
            const employeeEntity = new EmplyeeDetails()
            const data = await this.employeeDetailsRepo.getemployeeId()
            const maxId = data.employeeId
            employeeEntity.employeeCode= "EMP" + '-' + (Number(maxId) + 1)
            employeeEntity.firstName = req.firstName;
            employeeEntity.lastName=req.lastName
            employeeEntity.dateOfBirth=req.dateOfBirth;
            employeeEntity.alterNativeMobileNumber=req.alterNativeMobileNumber
            employeeEntity.mobileNumber=req.mobileNumber
            employeeEntity.emial=req.emial
            employeeEntity.address=req.address
            employeeEntity.pinCode=req.pinCode
            if (isUpdate) {
                employeeEntity.employeeId = req.employeeId;
                employeeEntity.employeeCode=req.employeeCode
                employeeEntity.updatedUser = req.updateUser
            } else {
                employeeEntity.createdUser = req.createdUser;
            }
          
            const save = await this.employeeDetailsRepo.save(employeeEntity)
            if (save) {
                return new AllEmployeeDetailsResponseModel(true, 0, isUpdate ? 'Employee Updated Sucessfully' : 'Employee creted sucessfuly', [])
            }
        } catch (err) {
            throw err
        }
    }

    async getAllEmploee():Promise<AllEmployeeDetailsResponseModel>{
        const employee = await this.employeeDetailsRepo.find({order:{employeeId:'DESC'}})
        if(employee.length >0){
            return new AllEmployeeDetailsResponseModel(true,1,'Employees Retrived Sucessfully',employee)
        }else{
            return new AllEmployeeDetailsResponseModel(false,0,'No  Employees Found ')

        }

    }

    async getAllActiveEmploee():Promise<AllEmployeeDetailsResponseModel>{
        const employee = await this.employeeDetailsRepo.find({
            where:{isActive:true},
            order:{firstName:'ASC'}})
        if(employee.length >0){
            return new AllEmployeeDetailsResponseModel(true,1,'Employees Retrived Sucessfully',employee)
        }else{
            return new AllEmployeeDetailsResponseModel(false,0,'No  Employees Found ')

        }

    }


    
    async ActivateOrDeactivateEmployee(req: EmployeeIdReq): Promise<AllEmployeeDetailsResponseModel> {
        const employeeDetails = await this.employeeDetailsRepo.findOne({ where: { employeeId: req.employeeId } })
        if (employeeDetails) {
            if (req.versionFlag != employeeDetails.versionFlag) {
                throw new AllEmployeeDetailsResponseModel(false, 1, 'SomeOne updated. Referesh and try again', [])
            } else {
                const employeeUpdate = await this.employeeDetailsRepo.update({ employeeId: req.employeeId }, { isActive: req.isActive})
                if (employeeDetails.isActive) {
                    console.log('activeeeee')
                    if (employeeUpdate.affected) {
                        return new AllEmployeeDetailsResponseModel(true, 0, 'Employee de-activated successfully', [])
                    } else {
                        throw new AllEmployeeDetailsResponseModel(false, 1, 'Employee already deactivated', [])
                    }
                } else {
                    if (employeeUpdate.affected) {
                        return new AllEmployeeDetailsResponseModel(true, 0, 'Employee activated successfully', [])
                    } else {
                        throw new AllEmployeeDetailsResponseModel(false, 1, 'Employee already activated', [])
                    }
                }
            }
        }
        else {
            throw new AllEmployeeDetailsResponseModel(false, 1, 'No record found', [])

        }

    }

    async getAllActiveEmploeesByDepartment(req:DepartmentReq):Promise<AllEmployeeDetailsResponseModel>{
        // const getDeparmentId = await this.departmentRepo.find({where:{department:req.department}})
        const employee = await this.employeeDetailsRepo.find({
            // where:{isActive:true,deparmentInfo:{departmentId:req.departmentId}},
            order:{firstName:'ASC'}})
        if(employee.length >0){
            return new AllEmployeeDetailsResponseModel(true,1,'Employees Retrived Sucessfully',employee)
        }else{
            return new AllEmployeeDetailsResponseModel(false,0,'No  Employees Found ')

        }
    }
}