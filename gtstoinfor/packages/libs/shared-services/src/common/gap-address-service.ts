import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class GapAddressService extends CommonAxiosService {
    private URL = "/gapAddress";

    async gapSaveAddressInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/gapSaveAddressInfo", req)
    }

    async getGapAddressInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getGapAddressInfo")
    }  

}