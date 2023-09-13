import { CommonAxiosService } from "../common-axios-service-prs";
import { M3MastersCategoryReq, M3MastersReq, M3MastersResponseModel } from "@project-management-system/shared-models";

export class M3MastersService extends CommonAxiosService{
    URL = "/m3-masters";

  async create(req: M3MastersReq): Promise<M3MastersResponseModel> {
    return this.axiosPostCall(this.URL + "/create",req)
  }

  async update(req: M3MastersReq): Promise<M3MastersResponseModel> {
    return this.axiosPostCall(this.URL + "/update",req)
  }

  async getAll(): Promise<M3MastersResponseModel> {
    return this.axiosPostCall(this.URL + "/getAll")
  }

  async getByCategory(req:M3MastersCategoryReq): Promise<M3MastersResponseModel> {
    return this.axiosPostCall(this.URL + "/getByCategory",req)
  }
}