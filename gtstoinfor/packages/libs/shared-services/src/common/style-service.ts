import { AllStyleResponseModel, StyleDto, StyleIdReq, UploadResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StyleService extends CommonAxiosService{
  URL = "/style";

  async creteStyle(dto: StyleDto): Promise<AllStyleResponseModel> {
    return this.axiosPostCall(this.URL + "/creteStyle", dto)
}
  async fileUpload(file: any): Promise<UploadResponse> {
    return await this.axiosPostCall(this.URL + '/fileUpload', file);
  }
  async getAllStyle(): Promise<AllStyleResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllStyle")
}
async ActivateOrDeactivateStyle(dto: StyleIdReq): Promise<AllStyleResponseModel> {
  return this.axiosPostCall(this.URL + "/ActivateOrDeactivateStyle", dto)
}

}
