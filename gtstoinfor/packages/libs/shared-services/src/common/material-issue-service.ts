import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class MaterrialIssueServices extends CommonAxiosService {
  URL = "/material-issue";

  async getAllMaterialIssues(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllMaterial",)
  }
  async getAllMateriaFabric(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllMaterialFabric",)
  }
  async getAllMaterialTrim(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllMaterialTrim",)
  }

}