import { AllCompanyResponseModel, CompanyDto, CompanyRequest, CompanyResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class CompanyService extends CommonAxiosService{
  URL = "/company";
  apiUrl = "https://172.17.3.115:23005/m3api-rest/execute/MNS100MI/LstDivisions?CONO=111";
  
  async createCompany(company: CompanyDto): Promise<CompanyResponseModel> {
    // console.log('testss',company)
    return this.axiosPostCall(this.URL + "/createCompany", company)
}

  async updateCompany(company: CompanyDto): Promise<CompanyResponseModel> {
    return this.axiosPostCall(this.URL + "/updateCompany", company)
  }
  async getAllCompany(req?:any): Promise<AllCompanyResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllCompany',req)
  }

  async ActivatedeActivateCompany(companyDto: CompanyDto ): Promise<CompanyResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateCompany', companyDto)

  }
  async getAllActiveCompanys(): Promise<AllCompanyResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveCompany')
  }
  async getCompanyById(companyRequest:CompanyRequest): Promise<CompanyResponseModel> {
    return this.axiosPostCall(this.URL + '/getCompanyById',companyRequest)
  }
  async getActiveCompanysCount(): Promise<AllCompanyResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveCompanyCount')
  }
  async getCompanyData ():Promise<CompanyResponseModel>{
    return this.axiosPostCall(this.URL + '/getCompanyData')
  }
}