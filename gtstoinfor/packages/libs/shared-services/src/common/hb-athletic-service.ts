import { CommonResponseModel } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class HbService extends CommonAxiosService {
    private hbOrdersController = "/hb-athletics-orders"


    async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/saveHbOrdersData", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/fileUpload", formData)
    }

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/getPdfFileInfo")
    }

    async getHborderData(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/getHborderData",req)
    }

    async getHbPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/getHbPoNumber")
    }

    async hbCoLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/hbCoLineCreationReq", req)
    }

    
    async getHborderDataForInfo(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/getHborderDataForInfo",req)
    }

    async hbAthleticBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.hbOrdersController + "/hbAthleticBot")
    }

}