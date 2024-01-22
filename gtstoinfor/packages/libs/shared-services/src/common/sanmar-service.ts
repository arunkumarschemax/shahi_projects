import { CommonResponseModel, ItemNoDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class SanmarService extends CommonAxiosService {
    private sanmarOrdersController = "/sanmar-orders"


    async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/saveSanmarOrdersData", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/fileUpload", formData)
    }

    async getPdfFileInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getPdfFileInfo", req)
    }

    async getorderDataForInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getorderDataForInfo", req)
    }


    async getCustomerPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getCustomerPoNumber")
    }


    async sanmarBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/sanmarBot")
    }


    async getorderacceptanceData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getorderacceptanceData", req)
    }

    async sanmarCoLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/sanmarCoLineCreationReq", req)
    }
    async getSanmarCoLineData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getSanmarCoLineData", req)
    }
    async getItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getItem")
    }
    async getCoPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getCoPoNumber")
    }
    async updateItemNo(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/updateItemNo", payload)
    }

    async deleteCoLine(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/deleteCoLine", payload)
    }

    async getordercomparationData(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getordercomparationData",req)
    }

}