import { CommonResponseModel, ItemNoDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"


export class LevisService extends CommonAxiosService {
    private levisOrdersController = "/levis"

    
    async saveLevisOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/saveLevisOrder", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/fileUpload", formData)
    }

    async getorderacceptanceData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getorderacceptanceData", req)
    }

    async coLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/coLineCreationReq", req)
    }

    async getPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getPoNumber")
    }

    async getCoLineData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getCoLineData", req)
    }

    async getItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getItem")
    }
    async getCoPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getCoPoNumber")
    }

    async updateItemNo(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/updateItemNo", payload)
    }

    async deleteCoLine(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/deleteCoLine", payload)
    }

    async getorderDataForInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getorderDataForInfo", req)
    }

    async updateStatusInOrder(req:ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/updateStatusInOrder",req)
    }

    async getPdfFileInfo(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getPdfFileInfo",req)
    }
 
    async getordercomparationData(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getordercomparationData",req)
    }

    
    async levisBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/levisBot")
    }

    async getOrderReportData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getOrderReportData", req)
    }

    async getSplitOrderComparisionData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getSplitOrderComparisionData", req)
    }
    async editCoLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/editCoLineCreationReq", req)
    }


    async getEditCoLineData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getEditCoLineData", req)
    }

    async getEditItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getEditItem")
    }
    async getEditCoPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getEditCoPoNumber")
    }

    async getHistoryPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/getHistoryPoNumber")
    }

    async deleteEditCoLine(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/deleteEditCoLine", payload)
    }

    async updateStatusInOrderAcceptance(req:ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.levisOrdersController + "/updateStatusInOrderAcceptance",req)
    }


}