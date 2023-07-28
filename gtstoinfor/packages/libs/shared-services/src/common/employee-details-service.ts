import { AllEmployeeDetailsResponseModel, EmployeeDetailsResponse, employeeIdReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class EmployeeDetailsService extends CommonAxiosService{
  URL = "/employee-details";

  async createEmployee(dto: EmployeeDetailsResponse): Promise<AllEmployeeDetailsResponseModel> {
    console.log(dto,'drooo')
    return this.axiosPostCall(this.URL + "/createEmployee", dto)
}
async updateEmployee(dto: EmployeeDetailsResponse): Promise<AllEmployeeDetailsResponseModel> {
  return this.axiosPostCall(this.URL + "/updateEmployee", dto)
}
async getAllEmploee(req?:any): Promise<AllEmployeeDetailsResponseModel> {
  return this.axiosPostCall(this.URL + '/getAllEmploee',req)
}

async ActivateOrDeactivateEmployee(
  req: employeeIdReq): Promise<AllEmployeeDetailsResponseModel> {
  return this.axiosPostCall(this.URL + '/ActivateOrDeactivateEmployee', req)

}

async getAllActiveEmploee(): Promise<AllEmployeeDetailsResponseModel> {
  return this.axiosPostCall(this.URL + '/getAllActiveEmploee')

}

}
