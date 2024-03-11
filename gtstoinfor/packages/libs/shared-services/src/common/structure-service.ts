import { CategoryIdRequest, ColumnActivateReq, ColumnReq, ColumnResponseModel, StructureActivateReq, StructureReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StructureService extends CommonAxiosService{
      URL = '/structure';

    async createStructure(req:StructureReq): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/createStructure",req)
    }

    async updateStructure(req:StructureReq): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/updatestructure",req)
    }
  
    async getAllStructureInfo(): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllStrucutreInfo")
    }

    async activateOrDeactivateStructure(req:StructureActivateReq): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateStructure",req)
    }
    async getAllActiveStructureForCategory(req:CategoryIdRequest): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveStructureForCategory",req)
    }

}