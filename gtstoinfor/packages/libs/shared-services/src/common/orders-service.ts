import { COLineRequest, CoLineStatusReq, CommonResponseModel, CompareOrdersFilterReq, FileIdReq, FileTypeDto, OrderAcceptanceRequest, SaveOrderDto, SeasonWiseRequest, TrimOrdersReq, YearReq, orders, ordersPlanNo } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";
import { AxiosInstance } from "../axios-instance";
// import { AxiosInstance } from './axios-instance';


export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"

    async saveOrder(data: any, id: number, month: any, uploadType: string): Promise<CommonResponseModel> {
        // console.log(month)
        const idn = id;
        const montId = month
        const url = `/orders/saveOrder/${idn}/${montId}/${uploadType}`;
        return this.axiosPostCall(url, data);
    }

    async getOrdersData(req: orders): Promise<CommonResponseModel> {
        // console.log(req,"fe rreq")
        return this.axiosPostCall(this.ordersController + "/getOrdersData", req)
    }

    async getQtyChangeData(req: CompareOrdersFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyChangeData", req)
    }

    async getQtyDifChangeData(req: CompareOrdersFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyDifChangeData", req)
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

    async fileUpload(file: any, month: number, fileType: string, uploadType: string): Promise<CommonResponseModel> {
        const monthId = month;
        const url = `/orders/fileUpload/${monthId}/${fileType}/${uploadType}`;
        return this.axiosPostCall(url, file);
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.ordersController + '/updateFileStatus', req);
    }

    async getUploadFilesData(req?: FileTypeDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUploadFilesData", req)
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
    async getTrimOrdersData(req: TrimOrdersReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getTrimOrdersData", req)
    }
    async getUnacceptedTrimOrders(req: TrimOrdersReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUnacceptedTrimOrders", req)
    }
    async createCOline(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/createCOline", req)
    }
    async getMonthWiseReportData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthWiseReportData", req)
    }
    async getExfactoryYearData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryYear")
    }

    async getAllWareHouse(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseMonthData", req)
    }
    async getWareHouseYearData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseYearData")
    }

    async saveTrimOrder(data: any, id: number, month: any): Promise<CommonResponseModel> {
        // console.log(month)
        const idn = id;
        const montId = month
        const url = `/orders/saveTrimOrder/${idn}/${montId}`;
        return this.axiosPostCall(url, data);
    }

    async seasonWiseReport(req?: SeasonWiseRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/seasonWiseReport", req)
    }
    async seasonWiseTabs(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/seasonWiseTabs")
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
    async getMonthlyComparisionData(req: YearReq): Promise<CommonResponseModel> {

        return this.axiosPostCall(this.ordersController + "/getMonthlyComparisionData", req)
    }
    async getWareHouseComparisionData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseComparisionData", req)
    }

    async revertTrimFileData(req: FileIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/revertTrimFileData", req)
    }

    async getExfactoryWithComparisionExcel(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryComparisionExcelData", req)

    } async getExfactoryMonthExcel(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryMonthExcelData", req)
    }
    async getWareHouseComparisionExcelData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseComparisionExcelData", req)

    } async getWareHouseMonthExcelData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWareHouseMonthExcelData", req)
    }
    async getSeasonWiseItemCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getSeasonWiseItemCode")
    }

    async getSeasonWiseItemName(req: SeasonWiseRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getSeasonWiseItemName", req)
    }
    async getQtyDifChangeItemCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyDifChangeItemCode")
    }
    async getTrimOrdersNo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getTrimOrdersNo")
    }

    async getTrimSampleCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getTrimSampleCode")
    }
    async getOrdersStatus(req?: orders): Promise<CommonResponseModel> {
        // console.log(req,'okkkkkkk')
        return this.axiosPostCall(this.ordersController + "/getOrdersStatus", req)
    }
    async getOrderPlanNo(req?: orders): Promise<CommonResponseModel> {
        // console.log(req,'okkkkkkk')
        return this.axiosPostCall(this.ordersController + "/getOrderPlanNo", req)
    }

    async getOrderNumberDropDownInCompare(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getOrderNumberDropDownInCompare")
    }

    async createCOLineInternal(req: COLineRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/createCOLineInternal", req)
    }

    async updateStatusAfterCoLineCreationInM3(req: CoLineStatusReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/updateStatusAfterCoLineCreationInM3", req)
    }

    async getMonthlyComparisionDate(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthlyComparisionDate", req)
    }
    async getPhaseMonthData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseMonthData", req)
    }
    async getComparisionPhaseData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getComparisionPhaseData", req)
    }
    async getComparisionPhaseExcelData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getComparisionPhaseExcelData", req)
    }
    async getPhaseMonthExcelData(req: YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseMonthExcelData", req)
    }
    async getversion(req: ordersPlanNo): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getversion", req)
    }

    async getItemsMonthly(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getItemsMonthly")
    }
    async getPhaseItems(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseItems")
    }

    async getYearDropdown(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getYearDropdown")
    }

    async getLatestPreviousFilesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getLatestPreviousFilesData")
    }

    async processEmails(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/processEmails")
    }

    async readCell(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/readCell")
    }
    async saveItemDetailsOfTrimOrder(req: OrderAcceptanceRequest): Promise<CommonResponseModel> {
        return await AxiosInstance.post('https://nike-backend.shahiapps.in/api/nike-dpom/coLineCreationReq', req)
    }

    async getCoLine(req: any): Promise<CommonResponseModel> {
        return await AxiosInstance.post('https://nike-backend.shahiapps.in/api/nike-dpom/getCoLine', req)
    }

    async getBuyerPo(): Promise<CommonResponseModel> {
        return await AxiosInstance.post('https://nike-backend.shahiapps.in/api/nike-dpom/getBuyerPo')
    }

    async getColineItem(): Promise<CommonResponseModel> {
        return await AxiosInstance.post('https://nike-backend.shahiapps.in/api/nike-dpom/getColineItem')
    }

    async getColineOrderNo(): Promise<CommonResponseModel> {
        return await AxiosInstance.post('https://nike-backend.shahiapps.in/api/nike-dpom/getColineOrderNo')
    }

    async seasonWiseReportData(req?: SeasonWiseRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/seasonWiseReportData", req)
    }

}