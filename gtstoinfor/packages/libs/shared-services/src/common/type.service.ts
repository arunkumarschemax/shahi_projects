import { TypeActivateReq, TypeReq, TypeResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TypeService extends CommonAxiosService{
      URL = '/Type';

    async createType(req:TypeReq): Promise<TypeResponseModel> {
      return this.axiosPostCall(this.URL + "/createType",req)
    }

    async updateType(req:TypeReq): Promise<TypeResponseModel> {
      return this.axiosPostCall(this.URL + "/updateType",req)
    }
  
    async getAllTypeInfo(): Promise<TypeResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllTypeInfo")
    }

    async activateOrDeactivateType(req:TypeActivateReq): Promise<TypeResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateType",req)
    }

    async getAllActiveTypeInfo(): Promise<TypeResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveTypeInfo")
    }
}