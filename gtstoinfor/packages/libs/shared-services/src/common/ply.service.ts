import { CategoryIdRequest, CommissionResponseModel, CommonResponseModel, PlyDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PlyService extends CommonAxiosService{
      URL = '/ply';

    async createPly(req: PlyDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createPly",req)
    }

    async updatePly(req: PlyDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updatePly",req)
    }
  
    async getAllPlys(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllPlys")
    }

    async getAllActivePly(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActivePly")
    }
    async getAllPlyForCategory(req:CategoryIdRequest):Promise<CommonResponseModel>{
      return this.axiosPostCall(this.URL + '/getAllPlyForCategory',req)
    }
    
}