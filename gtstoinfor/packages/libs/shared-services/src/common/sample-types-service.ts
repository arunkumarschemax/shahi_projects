import { AllCurrencyResponseModel, AllOperationGroupsResponseModel, AllSampleTypesResponseModel, CurrencyDto, CurrencyRequest, CurrencyResponseModel, OperationGroupsDto, OperationGroupsRequest, OperationGroupsResponseModel, SampleTypesDto, SampleTypesRequest, SampleTypesResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class SampleTypesService extends CommonAxiosService{
  URL = "/sampleType";
  async createSampleType(req: SampleTypesDto): Promise<SampleTypesResponseModel> {
    return this.axiosPostCall(this.URL + "/createSampleType", req)
}
  async updateSampleType(req: SampleTypesDto): Promise<SampleTypesResponseModel> {
    return this.axiosPostCall(this.URL + "/updateSampleType", req)
  }
  async getAllSampleTypes(req?:any): Promise<AllSampleTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllSampleTypes',req)
  }
  async activateOrDeactivateSampleTypes(req: SampleTypesRequest): Promise<SampleTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateSampleTypes', req)
  }
  async getAllActiveSampleTypes(): Promise<AllSampleTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveSampleTypes')
  }
  async getActiveOperationGroupById(req:CurrencyRequest): Promise<SampleTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveSampleTypesById',req)
  }
}
