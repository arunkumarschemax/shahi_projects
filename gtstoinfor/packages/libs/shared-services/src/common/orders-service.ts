import { CommonResponseModel, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"

    async saveOrder(data: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/saveOrder", data)
    }

    async getOrdersData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getOrdersData")
    }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyChangeData")
    }

    async getContractDateChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getContractDateChangeData")
    }

    async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWharehouseDateChangeData")
    }

    async getUnitWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUnitWiseOrders")
    }

    async getDivisionWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getDivisionWiseOrders")
    }

    async getMaximumChangedOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMaximumChangedOrders")
    }

}