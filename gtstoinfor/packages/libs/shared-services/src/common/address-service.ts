import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class AddressService extends CommonAxiosService {
    private URL = "/address";

    async saveAddressInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/saveAddressInfo", req)
    }

    async getAddressInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAddressInfo")
    }  
}