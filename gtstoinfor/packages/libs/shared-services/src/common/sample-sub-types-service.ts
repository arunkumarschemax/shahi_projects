import { AllSampleSubTypesResponseModel, SampleSubTypesDTO, SampleSubTypesRequest, SampleSubTypesResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SampleSubTypesService extends CommonAxiosService{
  URL = "/sampleSubTypes";

  async createSampleSubType(sampleSubType: SampleSubTypesDTO): Promise<SampleSubTypesResponseModel> {
    // console.log('testss',sampleSubType)
    return this.axiosPostCall(this.URL + "/createSampleSubType", sampleSubType)
}

  async updateSampleSubType(operation: SampleSubTypesDTO): Promise<SampleSubTypesResponseModel> {
    return this.axiosPostCall(this.URL + "/updateSampleSubTypes", operation)
  }
  async getAllSampleSubType(): Promise<SampleSubTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllSampleSubTypes')
  }

  async getAllActiveSampleSubType(): Promise<AllSampleSubTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveSampleSubTypes')
  }
  async getActiveSampleSubTypeById(Request:SampleSubTypesRequest): Promise<SampleSubTypesResponseModel> {
    return this.axiosPostCall(this.URL + '/getActivesampleSubTypeById',Request)
  }

  async activateOrDeactivateSampleSubType(Req: SampleSubTypesDTO): Promise<SampleSubTypesResponseModel> {
    // console.log(Req,'shared-----------')
    return  this.axiosPostCall(this.URL + '/activateOrDeactivateSampleSubType', Req)
}
}
