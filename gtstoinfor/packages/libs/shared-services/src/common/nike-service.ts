import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class NikeService extends CommonAxiosService  {
    private DpomController = "/nike-dpom"


    async getFactoryReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getFactoryReportData")
    }

    async getByFactoryStatus():Promise<any> {
        return this.axiosPostCall(this.DpomController + "/getByFactoryStatus")
    }

    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getPlantWisePoOrders")
    }

    async getStatusWiseItems(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getStatusWiseItems")
    }

    async getCategoryWiseItemQty(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getCategoryWiseItemQty")
    }

    async getShipmentWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getShipmentWiseData")
    }

    async getPlanShipmentWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getPlanShipmentWiseData")
    }

}   