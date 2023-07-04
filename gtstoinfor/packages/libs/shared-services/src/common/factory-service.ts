import {
    AllFactoriesResponseModel,
    FactoryActivateDeactivateDto,
    FactoryDto,
    FactoryResponseModel,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class FactoryService extends CommonAxiosService {
    private FactoryController = "/factories";

    async createFactory(payload: FactoryDto): Promise<FactoryResponseModel> {
        return this.axiosPostCall(this.FactoryController + "/createFactory", payload)
    }

    async getFactories(): Promise<AllFactoriesResponseModel> {
        return this.axiosPostCall(this.FactoryController + "/getFactories")
    }

    async getActiveFactories(): Promise<AllFactoriesResponseModel> {
        return this.axiosPostCall(this.FactoryController + "/getActiveFactories")
    }

    async activateOrDeactivate(payload: FactoryActivateDeactivateDto): Promise<FactoryResponseModel> {
        return this.axiosPostCall(this.FactoryController + "/activateOrDeactivate", payload)
    }

}