import { CommonResponseModel } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class HbService extends CommonAxiosService {
    private hbOrdersController = "/hb-athletic-orders"


    async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/saveHbOrdersData", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/fileUpload", formData)
    }

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/getPdfFileInfo")
    }

}