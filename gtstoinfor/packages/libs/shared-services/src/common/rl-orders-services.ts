import { CommonResponseModel, FileIdReq, OrderAcceptanceRequest, PoOrderFilter, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import { AxiosInstance } from "../axios-instance";

export class RLOrdersService extends CommonAxiosService {
    private rlordersController = "/rl-orders"

    async saveOrdersDataFromPDF(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/saveOrdersDataFromPDF", req)
    }

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getPdfFileInfo")
    }

    async getorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getorderData", req)
    }

    async getorderDataByPoNumber(req: PoOrderFilter): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getorderDataByPoNumber", req)
    }

    async coLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/coLineCreationReq", req)
    }

    async getCoLine(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getCoLine", req)
    }

    async getBuyerPo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getBuyerPo")
    }

    async getColineItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getColineItem")
    }

    async getColineOrderNo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getColineOrderNo")
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        // console.log(formData,"shar")
        return this.axiosPostCall(this.rlordersController + "/fileUpload", formData)
    }

}