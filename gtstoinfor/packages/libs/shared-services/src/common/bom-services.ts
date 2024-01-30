import { CommonResponseModel, DestinationreqModel } from "@project-management-system/shared-models";
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
}