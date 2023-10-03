
import { CommonResponseModel, PriceListDto, PriceListResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class PriceListService extends CommonAxiosService {
    private URL = "/pricelist";

    async createPriceList(req: PriceListDto): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + "/createPriceList", req)
    }

    async getAllPriceList(req:any): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceList",req)
    }

    async  updatePriceList(req: PriceListDto): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + '/updatePriceList', req)
    }
    async getAllActivePriceList(): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllActivePriceList")
    }

    async ActivateOrDeactivatePriceList(payload: any): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + "/ActivateOrDeactivatePriceList", payload)
    }

    async getAllPriceListStyles(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceListStyles")
    }

    async getAllPriceListDestination(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceListDestination")
    }
    async getAllPriceListYear(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceListYear")
    }  
     async getAllPriceListCurrency(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceListCurrency")
    }
    async getAllPriceListSeasonCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceListSeasonCode")
    }

    async fileUpload(file: any): Promise<CommonResponseModel> {
        const url = `/priceList/fileUpload`;
        return this.axiosPostCall(url, file);
    }

    async savePriceListData(data: any, id: number): Promise<CommonResponseModel> {
        const idn = id;
        const url = `/priceList/savePriceListData/${idn}`;
        return this.axiosPostCall(url, data);
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.URL + '/updateFileStatus', req);
    }

    async getUploadFilesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getUploadFilesData")
    }

    async getPriceHistory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPriceHistory")
    }
}