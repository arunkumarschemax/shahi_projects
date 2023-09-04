import { CommonResponseModel, FileIdReq, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";

export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"

    async saveOrder(data: any, id: number, month: any): Promise<CommonResponseModel> {
        console.log(month)
        const idn = id;
        const montId = month
        const url = `/orders/saveOrder/${idn}/${montId}`;
        return this.axiosPostCall(url, data);
    }

    async getOrdersData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getOrdersData")
    }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyChangeData")
    }

    async getQtyDifChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyDifChangeData")
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

    // async fileUpload(file: any): Promise<CommonResponseModel> {
    //     return await this.axiosPostCall(this.ordersController + '/fileUpload', file);
    // }

    async fileUpload(file: any, month: number): Promise<CommonResponseModel> {
        const monthId = month;
        const url = `/orders/fileUpload/${monthId}`;
        return this.axiosPostCall(url, file);
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.ordersController + '/updateFileStatus', req);
    }

    async getUploadFilesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUploadFilesData")
    }

    async revertFileData(req: FileIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/revertFileData", req)
    }

    async getVersionWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getVersionWiseData")
    }

    async getPhaseWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseWiseData")
    }

    async getPhaseWiseExcelData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseWiseExcelData")
    }
    async getAllLatestFileMonthWisedata(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getAllLatestFileMonthWisedata")
    }

    async getMonthWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthWiseData")
    }
}