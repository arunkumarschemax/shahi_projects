import { BuyerIdReq, CommonResponseModel, M3KnittedFabricsDTO, M3trimsDTO, RackPositionDTO, UploadResponse, m3FabricFiltersReq } from "@project-management-system/shared-models";
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

    async getM3FabricsByBuyer(req: m3FabricFiltersReq): Promise<CommonResponseModel> {
        console.log(req)
        return this.axiosPostCall(this.URL + "/getM3FabricsByBuyer", req)
    }

    async createM3Trim(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/createM3Trim", req)
    }

    async getFabricTypes(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getFabricTypes")
    }

    async getFabricWeaves(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getFabricWeaves")
    }

    async getFabricFinishes(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getFabricFinishes")
    }
    async createKnittedFabric(req:M3KnittedFabricsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/createKnittedFabric",req)
    }
    async getKnittedFabric(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getKnittedFabric")
    }
    async fileUpload(file: any): Promise<UploadResponse> {
        return await this.axiosPostCall(this.URL + '/fileUpload', file);
      }
}