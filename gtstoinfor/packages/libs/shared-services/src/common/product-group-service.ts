import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class ProductGroupService extends CommonAxiosService{

    URL ="/productGroup";

    async getAllProductGroup(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllProductGroup")
    }
}