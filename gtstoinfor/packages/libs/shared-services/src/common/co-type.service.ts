import { CoTypeActivateReq, CoTypeReq, CoTypeResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class CoTypeService extends CommonAxiosService{
      URL = '/co-types';

    async createCoType(req:CoTypeReq): Promise<CoTypeResponseModel> {
      return this.axiosPostCall(this.URL + "/createCoType",req)
    }

    async updateCoType(req:CoTypeReq): Promise<CoTypeResponseModel> {
      return this.axiosPostCall(this.URL + "/updateCoType",req)
    }
  
    async getAllCoTypeInfo(): Promise<CoTypeResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllCoTypeInfo")
    }

    async activateOrDeactivateCoType(req:CoTypeActivateReq): Promise<CoTypeResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateCoType",req)
    }

    async getAllActiveCoTypeInfo(): Promise<CoTypeResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveCoTypeInfo")
    }
}