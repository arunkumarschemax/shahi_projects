import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class HierachyLevelService extends CommonAxiosService{

    URL ="/hierachyLevel";

    async getAllhierachyLevel(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllhierachyLevel")
    }
}