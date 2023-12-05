import { ThicknessActivateReq, ThicknessReq, ThicknessResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ThicknessService extends CommonAxiosService{
      URL = '/thicknesss';

    async createThickness(req:ThicknessReq): Promise<ThicknessResponseModel> {
      return this.axiosPostCall(this.URL + "/createThickness",req)
    }

    async updateThickness(req:ThicknessReq): Promise<ThicknessResponseModel> {
      return this.axiosPostCall(this.URL + "/updateThickness",req)
    }
  
    async getAllThicknessInfo(): Promise<ThicknessResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllThicknessInfo")
    }

    async activateOrDeactivateThickness(req:ThicknessActivateReq): Promise<ThicknessResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateThickness",req)
    }

    async getAllActiveThicknessInfo(): Promise<ThicknessResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveThicknessInfo")
    }
}