import { BuyerIdReq, CommonResponseModel, M3TrimTypeRequest, RackPositionDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class M3TrimsService extends CommonAxiosService {
    URL = "/m3Trims";

    async createM3Trims(createDto: any): Promise<CommonResponseModel> {
             
        return this.axiosPostCall(this.URL + '/createM3Trims', createDto)
    }

    async getM3Trims(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getM3Trims")
    }

    async getM3TrimsByBuyer(req: BuyerIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getM3TrimsByBuyer", req)
    }

    async getM3TrimsByTrimCode(req: M3TrimTypeRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getM3TrimsByTrimCode", req)
    }

}