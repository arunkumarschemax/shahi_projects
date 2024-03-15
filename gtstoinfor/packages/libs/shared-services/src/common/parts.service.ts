import {CommonResponseModel, PartsDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PartsService extends CommonAxiosService{
      URL = '/parts';

    async createParts(req: PartsDto): Promise<CommonResponseModel> {
      console.log(req,'///////////////////////')
      return this.axiosPostCall(this.URL + "/createParts",req)
    }

    async updateParts(req: PartsDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateParts",req)
    }
  
    async getAllParts(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllParts")
    }

    async getAllActiveParts(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveParts")
    }

    async  activateOrDeactivateParts(dto: PartsDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + '/activateOrDeactivateParts', dto)
  }
  async  getPartsById(req: PartsDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getPartsById',req)
}

}