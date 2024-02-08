import { CommonResponseModel, FileIdReq, ItemNoDto, OrderAcceptanceRequest, PoOrderFilter, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class CentricService extends CommonAxiosService {
    private centricOrdersController = "/centric-orders"

    async saveCentricOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/saveCentricOrder", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/fileUpload", formData)
    }
    async getorderData(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getorderData",req)
    }

    
    async getPdfFileInfo(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getPdfFileInfo",req)
    }

    async getPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getPoNumber")
    }

    async coLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/coLineCreationReq", req)
    }

    async getCentricCoLine(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getCentricCoLine", req)
    }

    async getCentricorderData(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getCentricorderData",req)
    }
    async getItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getItem")
    }
    async getCoPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getCoPoNumber")
    }
    
    async getseasonData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getseasonData")
    }

    async getCentricorderDataForSolidPO(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getCentricorderDataForSolidPO",req)
    }

    async getCentricorderDataForPPK(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getCentricorderDataForPPK",req)
    }

    async getPoNumberforPPKReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getPoNumberforPPKReport")
    }

    async getPoNumberforSolidReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getPoNumberforSolidReport")
    
    }

    async getordercomparationData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/getordercomparationData", req)
    }

    async updateItemNo(payload?:ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/updateItemNo",payload)
    }

    async deleteCoLine(payload?:ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/deleteCoLine",payload)
    }

    async centricBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/centricBot")
    }

    async updateStatusInOrder(req:ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.centricOrdersController + "/updateStatusInOrder",req)
    }
}