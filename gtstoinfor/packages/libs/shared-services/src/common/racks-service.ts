import { CommonResponseModel, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class RacksService extends CommonAxiosService {

 
        URL = "/racks";
   


    async createRacks(payload: any): Promise<CommonResponseModel> {   
             
        return this.axiosPostCall(this.URL + '/createRacks', payload)
    }

    async getRacks(): Promise<CommonResponseModel> {        
        return this.axiosPostCall(this.URL + "/getRacks")
    }

    async activateOrDeactivateRacks(payload: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/activateOrDeactivateRacks", payload)
    }
}