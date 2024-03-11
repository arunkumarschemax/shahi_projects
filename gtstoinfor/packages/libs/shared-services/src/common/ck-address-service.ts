import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class CkAddressService extends CommonAxiosService {
    private URL = "/ckAddress";

    async ckSaveAddressInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/ckSaveAddressInfo", req)
    }

    async getCkAddressInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getCkAddressInfo")
    }  

}