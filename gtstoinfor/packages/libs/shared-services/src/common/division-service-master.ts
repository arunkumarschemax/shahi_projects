import { AllDivisionResponseModel, DivisionDto, DivisionRequest, DivisionResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class DivisionService extends CommonAxiosService{
  URL = "/division";

  async createDivision(division: DivisionDto): Promise<DivisionResponseModel> {
    console.log('testss',division)
    return this.axiosPostCall(this.URL + "/createDivision", division)
}

  async updateDivision(division: DivisionDto): Promise<DivisionResponseModel> {
    return this.axiosPostCall(this.URL + "/updateDivision", division)
  }
  async getAllDivision(req?:any): Promise<AllDivisionResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllDivision',req)
  }

  async ActivatedeActivateDivision(
    divisionDto: DivisionDto
  ): Promise<DivisionResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateDivision', divisionDto)

  }
  async getAllActiveDivision(): Promise<AllDivisionResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActivedivision')
  }
  async getDivisionById(divisionRequest:DivisionRequest): Promise<DivisionResponseModel> {
    return this.axiosPostCall(this.URL + '/getDivisionById',divisionRequest)
  }
  async getActiveDivisionCount(): Promise<AllDivisionResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveDivisionCount')
  }
}
