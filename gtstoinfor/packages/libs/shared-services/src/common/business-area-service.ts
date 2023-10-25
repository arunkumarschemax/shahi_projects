import { BusinessAreaActivateReq, BusinessAreaReq, BusinessAreaResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class BusinessAreaService extends CommonAxiosService{
  URL = '/business-area';

  async createBusinessArea(req:BusinessAreaReq): Promise<BusinessAreaResponseModel> {
    return this.axiosPostCall(this.URL + "/createBusinessArea",req)
  }

  async updateBusinessArea(req:BusinessAreaReq): Promise<BusinessAreaResponseModel> {
    return this.axiosPostCall(this.URL + "/updateBusinessArea",req)
  }
  
  async getAllBusinessAreaInfo(): Promise<BusinessAreaResponseModel> {
  return this.axiosPostCall(this.URL + "/getAllBusinessAreaInfo")
  }

  async activateOrDeactivateBusinessArea(req:BusinessAreaActivateReq): Promise<BusinessAreaResponseModel> {
    return this.axiosPostCall(this.URL + "/activateOrDeactivateBusinessArea",req)
    }
}