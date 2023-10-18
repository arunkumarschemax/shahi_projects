import {    AllFobResponseModel,CommonResponseModel,FabricContentResponseModel,FabricContentdto,FactoryActivateDeactivateDto, FobActivateDeactivateDto, FobResponseModel,Fobdto,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class FabricContentService extends CommonAxiosService {
    private Controller = '/fabricContent';


    async createFabricContentplist(payload: FabricContentdto): Promise<FabricContentResponseModel> {
        return this.axiosPostCall(this.Controller + "/createFabricContentplist", payload)
    }
    async updateFabricContent(dto: FabricContentdto): Promise<FabricContentResponseModel> {
        return await this.axiosPostCall(this.Controller + '/updateFabricContent', dto)
    }

    async getFabricContent(): Promise<FabricContentResponseModel> {
        return this.axiosPostCall(this.Controller + "/getFabricContent")
    }

    async getActiveFactories(): Promise<AllFobResponseModel> {
        return this.axiosPostCall(this.Controller + "/getActiveFactories")
    }
   

    async activateOrDeactivate(payload: FobActivateDeactivateDto): Promise<FobResponseModel> {
        return this.axiosPostCall(this.Controller + "/activateOrDeactivate", payload)
    }

    async uploadFabricContent(payload: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.Controller + "/uploadFabricContent", payload)
    }

}