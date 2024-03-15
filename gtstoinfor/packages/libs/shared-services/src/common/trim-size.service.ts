import { CommonResponseModel, TrimSizeDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TrimSizeService extends CommonAxiosService{
      URL = '/trim-size';

    async createTrimSize(req: TrimSizeDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createTrimSize",req)
    }

    async updateTrimSize(req: TrimSizeDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateTrimSize",req)
    }
  
    async getAllTrimSizes(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllTrimSizes")
    }

    async getAllActiveTrimSizes(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveTrimSizes")
    }

    async activateOrDeactivateSize(req: TrimSizeDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateSize",req)
    }
}