import { BomCreationFiltersReq, BomGenerationReq, BomPrintFilterReq, BomPrintInfoModel, CommonResponseModel, DestinationreqModel, ItemInfoFilterReq, PpmDateFilterRequest, StyleIdReq, StyleNumberReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class BomService extends CommonAxiosService {
    private URL = "/bom";

    async createBom(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/createBom", req)
    }

    async getAllStylesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllStylesData")
    }
    async getPpmPoLineData(req: PpmDateFilterRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPpmPoLineData",req)
    }
    async getAllTrimInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllTrimInfo")
    }

    async getBomInfoAgainstStyle(req: StyleNumberReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomInfoAgainstStyle", req)
    }

    async getItemInfo(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getItemInfo", req)
    }

    async getItemDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getItemDropdownByCreatedAt", req)
    }

    async getRegionDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getRegionDropdownByCreatedAt", req)
    }

    async getBomPrintInfo(req:BomPrintFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomPrintInfo",req)
    }

    async getStylesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getStylesData")
    }
    async getPoLineDataForCihinaInserttag(req:ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPoLineDataForCihinaInserttag",req)
    }
    async getBomDataForStyle(req:StyleIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomDataForStyle",req)
    }

    async getBomCreationData(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomCreationData",req)
    }

    async generateBom(req: BomGenerationReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateBom",req)
    }
    
}