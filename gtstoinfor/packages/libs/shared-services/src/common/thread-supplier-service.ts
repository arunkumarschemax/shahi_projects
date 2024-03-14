import { CommonResponseModel, DestinationreqModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class ThreadSupplierService extends CommonAxiosService {
    private URL = "/thread_supplier";  

    async getAllThreadSupplier(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllThreadSupplier")
    }  

}