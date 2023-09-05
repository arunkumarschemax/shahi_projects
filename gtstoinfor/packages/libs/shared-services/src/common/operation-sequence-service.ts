import { OperationSequenceRequest, OperationSequenceResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationSequenceService extends CommonAxiosService{
  URL = "/operationsequence";

  async createOperationSequence(req: OperationSequenceRequest): Promise<OperationSequenceResponse> {
    return this.axiosPostCall(this.URL + "/createOperationSequence", req)
}
}