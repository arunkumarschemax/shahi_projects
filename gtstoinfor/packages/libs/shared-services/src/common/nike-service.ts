import { CommonResponseModel, DpomApproveRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class NikeService extends CommonAxiosService {
    private dpomController = "/nike-dpom"


    async getFactoryReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFactoryReportData")
    }

    async getByFactoryStatus(): Promise<any> {
        return this.axiosPostCall(this.dpomController + "/getByFactoryStatus")
    }
    async getDivertReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getDivertReportData")
    }
    async getCountForDivertReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getCountForDivertReport")
    }

    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPlantWisePoOrders")
    }

    async getStatusWiseItems(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getStatusWiseItems")
    }

    async getOrderAcceptanceData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getOrderAcceptanceData")
    }

    async approveDpomLineItemStatus(req: DpomApproveRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/approveDpomLineItemStatus", req)
    }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getQtyChangeData")
    }

    async poLineItemStatusChange(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/poLineItemStatusChange")
    }
    async getShipmentPlaningChart(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getShipmentPlaningChart")
    }
}   