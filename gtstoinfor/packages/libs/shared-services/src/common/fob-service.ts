import {    AllFobResponseModel,FactoryActivateDeactivateDto, FobActivateDeactivateDto, FobResponseModel,Fobdto,
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

    async getFobPrice(): Promise<AllFobResponseModel> {
        return this.axiosPostCall(this.fobController + "/getFobPrice")
    }

    async getActiveFactories(): Promise<AllFobResponseModel> {
        return this.axiosPostCall(this.fobController + "/getActiveFactories")
    }
   

    async activateOrDeactivate(payload: FobActivateDeactivateDto): Promise<FobResponseModel> {
        return this.axiosPostCall(this.fobController + "/activateOrDeactivate", payload)
    }

}