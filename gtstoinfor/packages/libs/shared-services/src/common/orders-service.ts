import { CommonResponseModel, FileIdReq, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";

export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"

    // async saveOrder(data: any, id:number): Promise<CommonResponseModel> {
    //     return this.axiosPostCall(this.ordersController + "/saveOrder", data,{id})
    // }

    async saveOrder(data: any, id: number): Promise<CommonResponseModel> {

        const idn = id; // Replace with the desired id value
        const url = `/orders/saveOrder/${idn}`;
        axios.post(url, data)
            .then((response) => {
                // Handle the response
            })
            .catch((error) => {
                // Handle errors
            });
        
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
    async fileUpload(file: any): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.ordersController + '/fileUpload', file);
    }
    async getUploadFilesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUploadFilesData")
    }

    async revertFileData(req:FileIdReq): Promise<CommonResponseModel> {
        console.log(req)
        return this.axiosPostCall(this.ordersController + "/revertFileData" , req)
    }
}