import { CommonResponseModel } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class SanmarService extends CommonAxiosService {
    private sanmarOrdersController = "/sanmar-orders"


    async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/saveSanmarOrdersData", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/fileUpload", formData)
    }

}