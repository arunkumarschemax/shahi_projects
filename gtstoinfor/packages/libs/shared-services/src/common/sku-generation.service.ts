import { SKUGenerationReq, SKUGenerationResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SKUGenerationService extends CommonAxiosService{
    URL ="/skumapping";

    async skuGeneration(req: SKUGenerationReq): Promise<SKUGenerationResponseModel> {
        return this.axiosPostCall(this.URL + "/skuGeneration", req)
    } 

}