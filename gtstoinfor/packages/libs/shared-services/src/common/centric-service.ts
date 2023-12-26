import { CommonResponseModel, FileIdReq, OrderAcceptanceRequest, PoOrderFilter, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class CentricService extends CommonAxiosService {
    private centricOrdersController = "/centric-orders"

    async saveCentricOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/saveCentricOrder", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/fileUpload", formData)
    }
    async getorderData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getorderData")
    }

    
    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getPdfFileInfo")
    }
    
}