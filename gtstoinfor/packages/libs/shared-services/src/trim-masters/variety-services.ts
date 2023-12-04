import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import {
  AllVarietysResponseModel,
  CommonResponseModel,
  VarietyDtos,
} from "@project-management-system/shared-models";

export class VarietyService extends CommonAxiosService {
  URL = "/variety";

  async createVariety(req: VarietyDtos): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createVariety", req);
  }

  async updateVariety(req: VarietyDtos): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/updateVariety", req);
  }

  async getAllVariety(): Promise<AllVarietysResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllVariety");
  }

  async getAllActiveVariety(): Promise<AllVarietysResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllActiveVariety");
  }

  async activateOrDeactivateVariety(req: VarietyDtos): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/activateOrDeactivateVariety", req);
  }

  async getActiveVarietyById(req:VarietyDtos): Promise<AllVarietysResponseModel> {
    return this.axiosPostCall(this.URL + "/getActiveVarietyById",req);
  }
}
