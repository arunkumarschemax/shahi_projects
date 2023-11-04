import { AllStocksResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StockService extends CommonAxiosService {
   stocksController = "/stocks";

  async getAllStocks(): Promise<AllStocksResponseModel> {
    return this.axiosPostCall(this.stocksController + "/getAllStocks");
  }

}