import { AllStocksResponseModel, SampleFilterRequest, StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StockService extends CommonAxiosService {
   stocksController = "/stocks";

  async getAllStocks(): Promise<AllStocksResponseModel> {
    return this.axiosPostCall(this.stocksController + "/getAllStocks");
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
  console.log(req,'shared service')
  return this.axiosPostCall(this.stocksController + "/getAllStockReportData",req)
}

}