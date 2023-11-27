
import { CommonResponseModel, FileIdReq, MaterialIssueDto, MaterialIssueLogrequest, MaterialIssueRequest, RequestNoDto, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";

export class MaterialIssueService extends CommonAxiosService {
  private issueController = "/material-issue"

  async getDataByStyleId(req: MaterialIssueRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.issueController + "/getDataByStyleId", req)
  }

  async getAllMaterialIssues(req?:RequestNoDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.issueController + "/getAllMaterial",req)
  }

  async createMaterialIssue(req: MaterialIssueDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.issueController + "/createMaterialIssue", req)
  }

  async getMaterialIssue(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.issueController + "/getRequestNoDrop")
  }

  async createMaterialIssueLog(req: MaterialIssueLogrequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.issueController + "/createMaterialIssueLog", req)
  }
 
}