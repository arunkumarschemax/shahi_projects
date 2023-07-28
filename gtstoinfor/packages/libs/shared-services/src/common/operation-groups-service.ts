import { AllCurrencyResponseModel, AllOperationGroupsResponseModel, CurrencyDto, CurrencyRequest, CurrencyResponseModel, OperationGroupsDto, OperationGroupsRequest, OperationGroupsResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationGroupsService extends CommonAxiosService{
  URL = "/operation-groups-controller";

  async createOperationGroup(req: OperationGroupsDto): Promise<OperationGroupsResponseModel> {
    return this.axiosPostCall(this.URL + "/createOperationGroup", req)
}

  async updateOperationGroup(req: OperationGroupsDto): Promise<OperationGroupsResponseModel> {
    return this.axiosPostCall(this.URL + "/updateOperationGroup", req)
  }

  async getAllOperationGroups(req?:any): Promise<AllOperationGroupsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllOperationGroups',req)
  }

  async activateOrDeactivateOperationGroup(req: OperationGroupsRequest): Promise<OperationGroupsResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateOperationGroup', req)

  }

  async getAllActiveOperationGroups(): Promise<AllOperationGroupsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveOperationGroups')
  }
  async getActiveOperationGroupById(req:CurrencyRequest): Promise<OperationGroupsResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveOperationGroupById',req)
  }
}
