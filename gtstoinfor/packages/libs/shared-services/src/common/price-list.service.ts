
import { PriceListDto, PriceListResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PriceListService extends CommonAxiosService {
    private URL = "/pricelist";

    async createPriceList(req: PriceListDto): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + "/createPriceList", req)
    }

    async getAllPriceList(): Promise<PriceListResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllPriceList")
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

}