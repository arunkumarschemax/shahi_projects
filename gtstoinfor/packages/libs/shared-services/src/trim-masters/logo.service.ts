
import { CategoryIdRequest, CommonResponseModel, LogoDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class LogoService extends CommonAxiosService{
      URL = '/logo';

    async createLogo(req: LogoDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createLogo",req)
    }

    async updateLogo(req: LogoDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateLogo",req)
    }
  
    async getAllLogo(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLogo")
    }

    async getAllActiveLogo(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveLogo")
    }

    async activateOrDeactivateLogo(req: LogoDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateLogo",req)
    }

    async getAllLogosForCategory(req: CategoryIdRequest): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLogosForCategory",req)
    }
}