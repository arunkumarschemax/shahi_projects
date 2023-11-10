import { CommonResponseModel, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class M3StyleService extends CommonAxiosService {

 
        URL = "/m3Style";
   


    async createM3Style(payload: any): Promise<CommonResponseModel> {   
             
        return this.axiosPostCall(this.URL + '/createM3Style', payload)
    }

    async getM3Style(): Promise<CommonResponseModel> {        
        return this.axiosPostCall(this.URL + "/getM3Style")
    }

    async activateOrDeactivateM3Style(payload: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/activateOrDeactivateM3Style", payload)
    }

}
