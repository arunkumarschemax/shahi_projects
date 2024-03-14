import { CommonResponseModel, TrimBuyerDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TrimBuyerService extends CommonAxiosService{
      URL = '/trim-buyer';

    async createTrimBuyer(req: TrimBuyerDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createTrimBuyer",req)
    }

    async updateTrimBuyer(req: TrimBuyerDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateTrimBuyer",req)
    }
  
    async getAllTrimBuyers(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllTrimBuyers")
    }

    async getAllActiveTrimBuyers(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveTrimBuyers")
    }

    async activateOrDeactivateBuyer(req: TrimBuyerDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateBuyer",req)
    }
}