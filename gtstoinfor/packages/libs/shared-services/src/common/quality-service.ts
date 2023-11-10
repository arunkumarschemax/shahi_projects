import { CommonResponseModel, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class QualityService extends CommonAxiosService {

 
        URL = "/quality";
   


    async createQuality(payload: any): Promise<CommonResponseModel> {   
             
        return this.axiosPostCall(this.URL + '/createQuality', payload)
    }

    async getQuality(): Promise<CommonResponseModel> {        
        return this.axiosPostCall(this.URL + "/getQuality")
    }

    async activateOrDeactivateQuality(payload: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/activateOrDeactivateQuality", payload)
    }

}
