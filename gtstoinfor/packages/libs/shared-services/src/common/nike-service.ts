import { CommonResponseModel, DiaPDFModel, DpomApproveRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class NikeService extends CommonAxiosService {
    private dpomController = "/nike-dpom"

    async saveDPOMExcelData(data: any, id: number): Promise<CommonResponseModel> {
        const idn = id;
        const url = `/nike-dpom/saveDPOMExcelData/${idn}`;
        return this.axiosPostCall(url, data);
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/fileUpload", formData)
    }

    async saveDPOMDataToDataBase(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/saveDPOMDataToDataBase")
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateFileStatus", req)
    }

    async getUploadFilesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getUploadFilesData")
    }

    async revertFileData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/revertFileData", req)
    }

    async getFactoryReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFactoryReportData")
    }

    async getByFactoryStatus(): Promise<any> {
        return this.axiosPostCall(this.dpomController + "/getByFactoryStatus")
    }

    async getDivertReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDivertReportData")
    }

    async getCountForDivertReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getCountForDivertReport")
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

    async getTotalItemQtyChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getTotalItemQtyChangeData")
    }

    async poLineItemStatusChange(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/poLineItemStatusChange")
    }

    async getShipmentPlaningChart(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipmentPlaningChart")
    }

    async getShipmentTrackerReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipmentTrackerReport")
    }

    async getCategoryWiseItemQty(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getCategoryWiseItemQty")
    }

    async getShipmentWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipmentWiseData")
    }

    async getPPMData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPPMData")
    }

    async getPlanShipmentWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPlanShipmentWiseData")
    }

    async saveDiaPDFFields(req : DiaPDFModel):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.dpomController + "/saveDiaPDFFields",req)
    }


}   