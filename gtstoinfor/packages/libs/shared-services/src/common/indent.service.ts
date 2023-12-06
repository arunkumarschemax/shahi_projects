import { BuyerRefNoRequest, CommonResponseModel, IndentDTO, IndentRequestDto, SourcingRequisitionReq, indentIdReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class IndentService extends CommonAxiosService {
  URL = "/indent";

  async createItems(dto: SourcingRequisitionReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/creteIndent", dto)
  }

  async getAllIndentData(req:any): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllIndentData",req)
  }
  async getIndentData(req:IndentRequestDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentData",req )
  }
  // async getIndentDate(): Promise<CommonResponseModel> {
  //   return this.axiosPostCall(this.URL + "/getIndentDate" )
  // }

  async getIndentnumbers(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentnumbers",req)
  }
  async getAllIndentItemDetailsAgainstIndent(req:indentIdReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllIndentItemDetailsAgainstIndent",req)
  }
  async getAllIndentTrimDetailsAgainstIndent(req:indentIdReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllIndentTrimDetailsAgainstIndent",req)
  }

  async getIndentDropDown(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIndentDropDown")
  }

}
