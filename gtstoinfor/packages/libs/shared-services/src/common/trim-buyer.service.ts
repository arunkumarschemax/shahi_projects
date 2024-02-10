import { CommissionResponseModel, TrimBuyerDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TrimBuyerService extends CommonAxiosService{
      URL = '/trim-buyer';

    async createTrimBuyer(req: TrimBuyerDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createTrimBuyer",req)
    }

    async updateTrimBuyer(req: TrimBuyerDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateTrimBuyer",req)
    }
  
    async getAllTrimBuyers(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllTrimBuyers")
    }

    async getAllActiveTrimBuyers(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveTrimBuyers")
    }
}