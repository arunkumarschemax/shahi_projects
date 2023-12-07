import { BuyerIdReq, CommonResponseModel, M3trimsDTO, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class M3ItemsService extends CommonAxiosService {

        URL = "/m3Items";
    async createM3Items(payload: any): Promise<CommonResponseModel> {   
             
        return this.axiosPostCall(this.URL + '/createM3Items', payload)
    }

    async getM3Items(req?:any): Promise<CommonResponseModel> {   
        console.log("hi")     
        return this.axiosPostCall(this.URL + "/getM3Items",req)
    }

    async getM3FabricsByBuyer(req: BuyerIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getM3FabricsByBuyer", req)
    }

    async createM3Trim(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/createM3Trim", req)
    }

}