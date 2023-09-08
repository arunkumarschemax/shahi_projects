import { CommonResponseModel, ItemCodeRequest, OperationSequenceRequest, OperationSequenceResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationSequenceService extends CommonAxiosService{
  URL = "/operationsequence";

  async createOperationSequence(req: OperationSequenceRequest): Promise<OperationSequenceResponse> {
    return this.axiosPostCall(this.URL + "/createOperationSequence", req)
  }

  async getInfoByItemCode(req: ItemCodeRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getInfoByItemCode", req)
  }

  async getOperationSequenceInfo(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getOperationSequenceInfo")
  }

  async getOperationSequenceInfoByItemCode(req: ItemCodeRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getOperationSequenceInfoByItemCode", req)
  }
}