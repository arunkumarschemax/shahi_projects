import { AddressResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class AddressService extends CommonAxiosService {
    private URL = "/address";

    async saveAddressInfo(req: any): Promise<AddressResponseModel> {
        return this.axiosPostCall(this.URL + "/saveAddressInfo", req)
    }

    async getAddressInfo(): Promise<AddressResponseModel> {
        return this.axiosPostCall(this.URL + "/getAddressInfo")
    }  
}