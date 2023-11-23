import { AllStocksResponseModel, M3ItemsDTO, SampleFilterRequest, StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StockService extends CommonAxiosService {
   stocksController = "/stocks";

  async getAllStocks(m3StyleDto?: M3ItemsDTO): Promise<AllStocksResponseModel> {
    return this.axiosPostCall(this.stocksController + "/getAllStocks", m3StyleDto);
  }

  async getStockReport(): Promise<any> {        
    return this.axiosPostCall(this.stocksController + "/getStockReport")
}

async getAllItemCode():Promise<AllStocksResponseModel>{
  return this.axiosPostCall(this.stocksController + "/getAllItemCode")
}

async getAllItemType():Promise<AllStocksResponseModel>{
  return this.axiosPostCall(this.stocksController + "/getAllItemType")
}

async getAllLocation():Promise<AllStocksResponseModel>{
  return this.axiosPostCall(this.stocksController + "/getAllLocation")
}

async getAllPlant():Promise<AllStocksResponseModel>{
  return this.axiosPostCall(this.stocksController + "/getAllPlant")
}

async getAllStockReportData(req? : StockFilterRequest): Promise<AllStocksResponseModel> {
  return this.axiosPostCall(this.stocksController + "/getAllStockReportData",req)
}

}