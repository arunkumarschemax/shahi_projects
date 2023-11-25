import { ColumnActivateReq, ColumnReq, ColumnResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ColumnService extends CommonAxiosService{
      URL = '/columns';

    async createColumn(req:ColumnReq): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/createColumn",req)
    }

    async updateColumn(req:ColumnReq): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/updateColumn",req)
    }
  
    async getAllColumnInfo(): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllColumnInfo")
    }

    async activateOrDeactivateColumn(req:ColumnActivateReq): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateColumn",req)
    }

    async getAllActiveColumnInfo(): Promise<ColumnResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveColumnInfo")
    }
}