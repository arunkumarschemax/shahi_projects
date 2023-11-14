import { CommonResponseModel, IndentDTO, SourcingRequisitionReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class IndentService extends CommonAxiosService {
  URL = "/indent";

  async createItems(dto: SourcingRequisitionReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/creteIndent", dto)
  }

  async getAllIndentData(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllIndentData")
  }
  async getIndentData(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentData")
  }

  async getIndentnumbers(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentnumbers")
  }

  async getIndentDropDown(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentDropDown")
  }

}
