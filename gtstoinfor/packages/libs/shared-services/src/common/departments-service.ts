import axios from 'axios';
import { DepartmentReq,DepartmentResponseModel,DepartmentsDtos,AllDepartmentsResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from '../common-axios-service-prs';

export class DepartmentService extends CommonAxiosService{
    URL ="/departments";

  async createDepartment(depart: DepartmentsDtos): Promise<DepartmentResponseModel> {
        // console.log('testss',depart)
        return this.axiosPostCall(this.URL + "/createDepartment", depart)
    }
  

  async updateDepartment(department: DepartmentsDtos): Promise<DepartmentResponseModel> {
    return this.axiosPostCall(this.URL + '/updateDepartment', department)
      
  }

  async getAllDepartments(): Promise<DepartmentResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllDepartments')
                 
    }

  async ActivateorDeactivateDepartment(departmentsDtos: DepartmentsDtos): Promise<AllDepartmentsResponseModel> {
    // console.log(departmentsDtos);
    return this.axiosPostCall(this.URL + '/activateorDeactivateDepartment', departmentsDtos)
     
  }

  async getAllActiveDepartments(): Promise<AllDepartmentsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveDepartments')
      
  }

  // async getActiveDepartmentsCount(): Promise<DepartmentStatusWiseResponseModel> {
  //   return await axios.post(this.URL + '/getActiveDepartmentCount').then(res => {
  //     return res.data
  //   });
  // }

  async getDeptDataById(deptReq: DepartmentReq): Promise<DepartmentResponseModel> {
    return this.axiosPostCall(this.URL + '/getDepartmentDataById', deptReq)
      
  }

  async getDepartmentNameByDeptIds(deptReq: number[]): Promise<AllDepartmentsResponseModel> {
    return this.axiosPostCall(this.URL + '/getDepartmentNameByDeptIds', deptReq)
      
  }
}