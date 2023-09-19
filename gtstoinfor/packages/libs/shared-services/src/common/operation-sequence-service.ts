import { CommonResponseModel, StyleRequest, OperationSequenceRequest, OperationSequenceResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationSequenceService extends CommonAxiosService{
  URL = "/operationsequence";

  async createOperationSequence(req: OperationSequenceRequest): Promise<OperationSequenceResponse> {
    return this.axiosPostCall(this.URL + "/createOperationSequence", req)
  }

  async getInfoByStyleCode(req: StyleRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getInfoByStyleCode", req)
  }

  async getOperationSequenceInfo(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getOperationSequenceInfo")
  }

  async getOperationSequenceInfoByStyleCode(req: StyleRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getOperationSequenceInfoByStyleCode", req)
  }
}