import { AllOperationsResponseModel, OperationsDTO, OperationsRequest, OperationsResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationsService extends CommonAxiosService{
  URL = "/operations";

  async createOperations(operations: OperationsDTO): Promise<OperationsResponseModel> {
    console.log('testss',operations)
    return this.axiosPostCall(this.URL + "/createOperation", operations)
}

  async updateOperations(operation: OperationsDTO): Promise<OperationsResponseModel> {
    return this.axiosPostCall(this.URL + "/updateOperations", operation)
  }
  async getAllOperations(): Promise<OperationsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllOperations')
  }

  // async ActivateDeActivateOperations(Operations: OperationsDto): Promise<OperationsResponseModel> {
  //   console.log(Operations,'shared-----------')
  //   return this.axiosPostCall(this.URL + '/activateOrDeactivateOperations', Operations)

  // }
  async getAllActiveOperations(): Promise<AllOperationsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveOpreations')
  }
  async getActiveOperationsById(Request:OperationsRequest): Promise<OperationsResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveOperationsById',Request)
  }

  async ActivateDeActivateOperation(Req: OperationsDTO): Promise<OperationsResponseModel> {
    console.log(Req,'shared-----------')
    return  this.axiosPostCall(this.URL + '/activateOrDeactivateOperations', Req)
}


}
