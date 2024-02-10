import { CommissionResponseModel, PartsDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PartsService extends CommonAxiosService{
      URL = '/parts';

    async createParts(req: PartsDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createParts",req)
    }

    async updateParts(req: PartsDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateParts",req)
    }
  
    async getAllParts(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllParts")
    }

    async getAllActiveParts(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveParts")
    }
}