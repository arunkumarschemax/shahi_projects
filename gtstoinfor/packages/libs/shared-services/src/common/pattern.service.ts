import { CommissionResponseModel, PatternDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PatternService extends CommonAxiosService{
      URL = '/pattern';

    async createPattern(req: PatternDto): Promise<CommissionResponseModel> {
      console.log(req,'=================d')
      return this.axiosPostCall(this.URL + "/createPattern",req)
    }

    async updatePattern(req: PatternDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updatePattern",req)
    }
  
    async getAllPatterns(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllPatterns")
    }

    async getAllActivePatterns(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActivePatterns")
    }

    async activateDeactivatePattern(req: PatternDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/activateDeactivatePattern", req)
    }
}