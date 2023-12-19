import {  CommonResponseModel, UomCategoryRequest, UomIdRequest, UomRequest, UomResponse } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class UomService extends CommonAxiosService{
  URL = "/Uoms";

  async createUom(uomRequest: UomRequest): Promise<UomResponse> {
    return this.axiosPostCall(this.URL + "/createUom", uomRequest)
}

  
  async getAllUoms(): Promise<UomResponse> {
    return this.axiosPostCall(this.URL + '/getAllUoms')
  }


  async getAllActiveUoms(): Promise<UomResponse> {
    return this.axiosPostCall(this.URL + '/getAllActiveUoms')
  }

 
  async getUomById(req:UomIdRequest): Promise<UomResponse> {
    return this.axiosPostCall(this.URL + '/getUomById',req)
    
  }
  

  async getUomByCategory(req:UomCategoryRequest): Promise<UomResponse> {
    return this.axiosPostCall(this.URL + '/getUomByCategory',req)
  }

  async getUomByWeight(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getUomByWeight')
  }

  async getUomByYarn(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getUomByYarn')
  }

}

