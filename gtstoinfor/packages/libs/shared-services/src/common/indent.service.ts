import { CommonResponseModel, IndentDTO, SourcingRequisitionReq, indentIdReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class IndentService extends CommonAxiosService {
  URL = "/indent";

  async createItems(dto: SourcingRequisitionReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/creteIndent", dto)
  }

  async getAllIndentData(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllIndentData")
  }
  async getIndentnumbers(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentnumbers")
  }
  async getAllIndentItemDetailsAgainstIndent(req:indentIdReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllIndentItemDetailsAgainstIndent",req)
  }
  

}
