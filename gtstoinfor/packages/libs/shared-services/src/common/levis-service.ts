import { CommonResponseModel } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class LevisService extends CommonAxiosService {
    private levisOrdersController = "/levis"

    
    async saveLevisOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/saveLevisOrder", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/fileUpload", formData)
    }


 
}