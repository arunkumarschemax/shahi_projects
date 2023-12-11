import { BuyerIdReq, BuyerRefNoRequest, CommonResponseModel, M3TrimType, M3TrimTypeRequest, M3trimsDTO, RackPositionDTO } from "@project-management-system/shared-models";
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

    async getAllM3Data(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllM3Data", req)
    }

    async getAllTypes(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllTypes", req)
    }

    async getAllContents(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllContents", req)
    }

    async getAllFinishes(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllFinishes", req)
    }

    async getAllHoles(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllHoles", req)
    }

    async getAllStructures(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllStructures", req)
    }

    async getAllCategories(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllCategories", req)
    }

    async getAllQuality(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllQuality", req)
    }

    async getAllThickness(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllThickness", req)
    }

    async getAllVariety(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllVariety", req)
    }

    async getAllUom(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllUom", req)
    }

    async getAllColors(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllColors", req)
    }

    async getAllTrimCategories(req?:M3TrimType): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllTrimCategories",req)
    }

    async getAllBuyers(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllBuyers")
    }

}