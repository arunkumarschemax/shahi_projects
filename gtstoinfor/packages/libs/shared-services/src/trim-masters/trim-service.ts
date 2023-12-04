import {
  AllTrimResponseModel,
  CommonResponseModel,
  TrimDtos,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
export class TrimService extends CommonAxiosService {
  URL = "/trim";

  async createTrim(req: TrimDtos): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createTrim", req);
  }

  async updateTrim(req: TrimDtos): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/updateTrim", req);
  }

  async getAllTrim(): Promise<AllTrimResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllTrim");
  }

  async getAllActiveTrim(): Promise<AllTrimResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllActiveTrim");
  }

  async activateOrDeactivateTrim(req: TrimDtos): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/activateOrDeactivateTrim", req);
  }

  async getActiveTrimById(req: TrimDtos): Promise<AllTrimResponseModel> {
    return this.axiosPostCall(this.URL + "/getActiveTrimById", req);
  }
}
