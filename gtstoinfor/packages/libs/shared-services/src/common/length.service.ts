import { CommissionResponseModel, LengthDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class LengthService extends CommonAxiosService{
      URL = '/length';

    async createLength(req: LengthDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createLength",req)
    }

    async updateLength(req: LengthDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateLength",req)
    }
  
    async getAllLength(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLength")
    }

    async getAllActiveLengths(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveLengths")
    }
}