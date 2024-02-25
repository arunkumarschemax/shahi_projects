import { BomPrintFilterReq, BomPrintInfoModel, CommonResponseModel, DestinationreqModel, ItemInfoFilterReq, StyleIdReq, StyleNumberReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class BomService extends CommonAxiosService {
    private URL = "/bom";

    async createBom(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/createBom", req)
    }

    async getAllStylesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllStylesData")
    }
    async getPpmPoLineData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPpmPoLineData")
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


      async saveExcelData(req: any): Promise<CommonResponseModel> {
        console.log(req,"req")
        return this.axiosPostCall(this.URL + '/saveExcelData', req);
    }
    
}