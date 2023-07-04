import { CommonAxiosService } from "../common-axios-service-prs";
import {LoginDto,AuthResponseModel} from '@project-management-system/shared-models'

export class UserManagementServices extends CommonAxiosService {
    private userManagementController = '/user-management';

    // async getAllCompanies(): Promise<CompanyResponse> {
    //     return await this.axiosPostCall(this.userManagementController + '/getAllCompanies')
    // }

    // async getAllDepartments(): Promise<DepartmentResponse> {
    //     return await this.axiosPostCall(this.userManagementController + '/getAllDepartments')
    // }

    async login(dto:LoginDto): Promise<AuthResponseModel> {
        return await this.axiosPostCall(this.userManagementController + '/login',dto)
    }
    async getAllUsers(): Promise<any> {
        return await this.axiosPostCall(this.userManagementController + '/getAllUsers')
    }


    
    
}