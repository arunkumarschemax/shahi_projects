import {
    AllFactoriesResponseModel,
    FactoryDto,
    FactoryResponseModel,
} from "@project-management-system/shared-models";
import { CommonAxiosServicePrs } from "../user-management/common-axios-service-prs";

export class FactoryService extends CommonAxiosServicePrs {
    private FactoryController = "/factories";

    async createFactory(payload: FactoryDto): Promise<FactoryResponseModel> {
        return this.axiosPostCall(this.FactoryController + "/createFactory", payload)
    }

    async getFactories(): Promise<AllFactoriesResponseModel> {
        return this.axiosPostCall(this.FactoryController + "/getFactories")
    }

}