import { CommonResponseModel, ThicknessActivateReq, ThicknessReq, ThicknessResponseModel, TrimIdRequestDto, TrimParamsMappingRequestDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TrimParamsMappingService extends CommonAxiosService{
      URL = '/trim-params-mapping';

    async createMapping(req:TrimParamsMappingRequestDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createMapping",req)
    }

    async updateMapping(req:TrimParamsMappingRequestDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateMapping",req)
    }
  
    async getMappedParamsByTrim(req:TrimIdRequestDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getMappedParamsByTrim", req)
    }
}