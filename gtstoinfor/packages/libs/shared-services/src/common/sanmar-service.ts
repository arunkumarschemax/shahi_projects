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

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getPdfFileInfo")
    }
    
    async getorderDataForInfo(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getorderDataForInfo",req)
    }
   
    
    async getCustomerPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getCustomerPoNumber")
    }

    
    async sanmarBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/sanmarBot")
    }


    async getorderacceptanceData(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/getorderacceptanceData",req)
    }

    async sanmarCoLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.sanmarOrdersController + "/sanmarCoLineCreationReq", req)
    }
}