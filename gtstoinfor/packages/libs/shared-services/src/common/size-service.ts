import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class SizeService extends CommonAxiosService {
    private URL = "/size";

    async saveSizeInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/saveSizeInfo", req)
    }

    async getSizeInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getSizeInfo")
    }  
}