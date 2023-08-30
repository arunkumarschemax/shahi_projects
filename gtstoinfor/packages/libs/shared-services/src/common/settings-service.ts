import { SettingsResponseModel, SettingsRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SettingsService extends CommonAxiosService{
    URL = "/settings";

    async createSettings(req: SettingsRequest): Promise<SettingsResponseModel> {
        return this.axiosPostCall(this.URL + '/createSettings',req)
     }
     
     async getAllSettingsInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllSettingsInfo')
     }
}