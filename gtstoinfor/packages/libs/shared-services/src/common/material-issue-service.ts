
import { CommonResponseModel, FileIdReq, MaterialIssueDto, MaterialIssueRequest, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";

export class MaterialIssueService extends CommonAxiosService {
    private issueController = "/material-issue"

    async getDataByStyleId(req: MaterialIssueRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.issueController + "/getDataByStyleId",req)
    }
    
    async getAllMaterialIssues(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.issueController + "/getAllMaterial",)
    }

    async createMaterialIssue(req: MaterialIssueDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.issueController + "/createMaterialIssue",req)
    }
    
}