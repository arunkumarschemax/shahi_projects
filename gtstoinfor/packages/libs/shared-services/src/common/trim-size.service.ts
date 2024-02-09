import { CommissionResponseModel, TrimBuyerDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TrimSizeService extends CommonAxiosService{
      URL = '/trim-size';

    async createTrimSize(req: TrimBuyerDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createTrimSize",req)
    }

    async updateTrimSize(req: TrimBuyerDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateTrimSize",req)
    }
  
    async getAllTrimSizes(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllTrimSizes")
    }

    async getAllActiveTrimSizes(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveTrimSizes")
    }
}