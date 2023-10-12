import {    AllFobResponseModel,CommonResponseModel,FactoryActivateDeactivateDto, FobActivateDeactivateDto, FobFilterRequest, FobResponseModel,Fobdto,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class FobService extends CommonAxiosService {
    private fobController = "/fobPriceList";

    async createFobplist(payload: Fobdto): Promise<FobResponseModel> {
        return this.axiosPostCall(this.fobController + "/createFobplist", payload)
    }
    async updateFobplist(dto: Fobdto): Promise<AllFobResponseModel> {
        return await this.axiosPostCall(this.fobController + '/updateFobplist', dto)
    }

    // async getFobPrice(): Promise<AllFobResponseModel> {
    //     return this.axiosPostCall(this.fobController + "/getFobPrice")
    // }

    async getFobPrice(req?: FobFilterRequest): Promise<AllFobResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobPrice",req)
    }

    async getActiveFactories(): Promise<AllFobResponseModel> {
        return this.axiosPostCall(this.fobController + "/getActiveFactories")
    }
   

    async activateOrDeactivate(payload: FobActivateDeactivateDto): Promise<FobResponseModel> {
        return this.axiosPostCall(this.fobController + "/activateOrDeactivate", payload)
    }

    async uploadFobPrice(payload: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.fobController + "/uploadFobPrice", payload)
    }

    async getFobPlanningSeasonCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobPlanningSeasonCode")
    }

    async getFobPlanningSeasonYear(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobPlanningSeasonYear")
    }

    async getFobStyleNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobStyleNumber")
    }

    async getFobColorCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobColorCode")
    }

    async getFobSizeDescription(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobSizeDescription")
    }

}