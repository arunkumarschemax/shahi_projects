import { CommonResponseModel, CompareOrdersFilterReq, FileIdReq, FileTypeDto, SaveOrderDto, SeasonWiseRequest, YearReq, orders } from "@project-management-system/shared-models"
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

    async getOrdersData(req:orders): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getOrdersData",req)
    }

    async getQtyChangeData(req:CompareOrdersFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyChangeData",req)
    }

    async getQtyDifChangeData(req:CompareOrdersFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyDifChangeData",req)
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

    async fileUpload(file: any, month: number,fileType:string): Promise<CommonResponseModel> {
        const monthId = month;
        const url = `/orders/fileUpload/${monthId}/${fileType}`;
        return this.axiosPostCall(url, file);
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.ordersController + '/updateFileStatus', req);
    }

    async getUploadFilesData(req?:FileTypeDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUploadFilesData",req)
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

    async getMonthlyPhaseWiseExcelData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthlyPhaseWiseExcelData")
    }

    async getAllLatestFileMonthWisedata(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getAllLatestFileMonthWisedata")
    }

    async getMonthWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthWiseData")

    }
     async getTrimOrdersData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getTrimOrdersData")
    }
    async createCOline(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/createCOline", req)
    }
    async getAll(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryMonthData",req)
    }
    async getExfactoryYearData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryYear")
    }
   
    async getAllWareHouse(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseMonthData",req)
    }
    async getWareHouseYearData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseYearData")
    }

    async saveTrimOrder(data: any, id: number, month: any): Promise<CommonResponseModel> {
        console.log(month)
        const idn = id;
        const montId = month
        const url = `/orders/saveTrimOrder/${idn}/${montId}`;
        return this.axiosPostCall(url, data);
    }

    async seasonWiseReport(req?:SeasonWiseRequest):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.ordersController + "/seasonWiseReport",req)
    }

    async getSeasonWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getSeasonWiseOrders")
    }

    async getYearWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getYearWiseOrders")
    }
    async getProdPlanCount(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getProdPlanCount")
    }
    async getExfactoryWithComparision(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryComparisionData",req)
    }
    async getWareHouseComparisionData(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseComparisionData",req)
    }

    async revertTrimFileData(req: FileIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/revertTrimFileData", req)
    }

    async getExfactoryWithComparisionExcel(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryComparisionExcelData",req)

    } async getExfactoryMonthExcel(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryMonthExcelData",req)
    }
    async getWareHouseComparisionExcelData(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseComparisionExcelData",req)

    } async getWareHouseMonthExcelData(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseMonthExcelData",req)
    }
    async getSeasonWiseItemCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getSeasonWiseItemCode")
    }

    async getSeasonWiseItemName(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getSeasonWiseItemName")
    }
    async getQtyDifChangeItemCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyDifChangeItemCode")
    }
    async getTrimOrdersNo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getTrimOrdersNo")
    }
    async getOrdersStatus(req?:orders):Promise<CommonResponseModel>{
        console.log(req,'okkkkkkk')
        return this.axiosPostCall(this.ordersController + "/getOrdersStatus",req)
    }
    async getOrderPlanNo(req?:orders):Promise<CommonResponseModel>{
        console.log(req,'okkkkkkk')
        return this.axiosPostCall(this.ordersController + "/getOrderPlanNo",req)
    }

    async getOrderNumberDropDownInCompare(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getOrderNumberDropDownInCompare")
    }
    async getPhaseMonthData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseMonthData")
    }
}