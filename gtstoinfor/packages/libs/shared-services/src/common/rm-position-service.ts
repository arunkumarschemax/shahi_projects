

import { CommonResponseModel, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class RackPositionService extends CommonAxiosService {

 
        URL = "/positions";
   


    async createPosition(payload: any): Promise<CommonResponseModel> {   
             
        return this.axiosPostCall(this.URL + '/createPosition', payload)
    }

    async getPosition(): Promise<CommonResponseModel> {        
        return this.axiosPostCall(this.URL + "/getPosition")
    }

    async activateOrDeactivatePosition(payload: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/activateOrDeactivatePosition", payload)
    }


}

