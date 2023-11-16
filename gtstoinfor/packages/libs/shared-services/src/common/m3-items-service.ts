import { CommonResponseModel, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class M3ItemsService extends CommonAxiosService {

 
        URL = "/m3Items";
   


    async createM3Items(payload: any): Promise<CommonResponseModel> {   
             
        return this.axiosPostCall(this.URL + '/createM3Items', payload)
    }

    async getM3Items(): Promise<CommonResponseModel> {        
        return this.axiosPostCall(this.URL + "/getM3Items")
    }
}