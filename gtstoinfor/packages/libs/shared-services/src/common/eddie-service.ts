import { CommonResponseModel} from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class EddieService extends CommonAxiosService {
    private eddierOrdersController = "/eddiebauer"

    async saveEddieOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/saveEddieOrder", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/fileUpload", formData)
    }


    async getorderacceptanceData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getorderacceptanceData", req)
    }
    async getPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getPoNumber")
    }

    async EddieBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/EddieBot")
    }

    async getPdfFileInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getPdfFileInfo", req)
    }
    async coLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/coLineCreationReq", req)
    }

    
    async getorderDataForInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getorderDataForInfo", req)
    }


    async getCoLineData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getCoLineData", req)
    }

    async getItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getItem")
    }
    async getCoPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getCoPoNumber")
    }
}