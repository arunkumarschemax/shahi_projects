import { CommonResponseModel, FileIdReq, FileStatusReq, OrdersReq, SaveOrderDto, UploadDocumentListResponseModel } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";

export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"
    private url = "/doc-upload";


    // async saveOrder(data: any, id:number): Promise<CommonResponseModel> {
    //     return this.axiosPostCall(this.ordersController + "/saveOrder", data,{id})
    // }

    async saveOrder(data: any, id: number): Promise<CommonResponseModel> {
        const idn = id;
        const url = `/orders/saveOrder/${idn}`;
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

    async updateFileStatus(req: FileStatusReq): Promise<CommonResponseModel> {
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

    async getRoleWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getRoleWiseOrders")
    }

    async getDocumentWiseDoc(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getDocumentWiseDoc")
    }

    async getDynamicData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getDynamicData")
    }

    async getDynamicDataForDocList(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getDynamicDataForDocList")
    }
    async getuploadeOrdersdata(req?:OrdersReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getuploadeOrdersdata",req)
    }
    async documentwisePercentage(): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/documentwisePercentage")
    }
    
    
    
}