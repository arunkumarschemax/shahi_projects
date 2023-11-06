import { Body, Controller, Get, Post } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { AllStocksResponseModel, CommonResponseModel, StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("Stocks")
@Controller("/stocks")
export class StocksController {

    constructor(
        private readonly stocksService: StocksService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ) { }

    @Get("")
    async testStocks() {
        return this.stocksService.testStocks();
    }

    @Post("/getAllStocks")
    async getAllStocks(): Promise<AllStocksResponseModel> {
        try {
            return await this.stocksService.getAllStocks();
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(AllStocksResponseModel, error);
        }
    }

    @Post('getStockReport')
  async getStockReport(): Promise<CommonResponseModel> {
    const data=await this.stocksService.getStockReport()
    return  data
}

@Post('/getAllItemCode')
async getAllItemCode(): Promise<CommonResponseModel> {
  try {
    return await this.stocksService.getAllItemCode();
  } catch (error) {
    return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
  }
}

@Post('/getAllItemType')
async getAllItemType(): Promise<CommonResponseModel>{
    try{
        return await this.stocksService.getAllItemType();
    }catch(err){
        return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
    }
}

@Post('/getAllLocation')
async getAllLocation(): Promise<CommonResponseModel>{
    try{
        return await this.stocksService.getAllLocation();
    }catch(err){
        return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
    }
}

@Post('/getAllPlant')
async getAllPlant(): Promise<CommonResponseModel>{
    try{
        return await this.stocksService.getAllPlant();
    }catch(err){
        return this.applicationExceptionhandler.returnException(CommonResponseModel,err)
    }
}

@Post('/getAllStockReportData')
@ApiBody({type: StockFilterRequest})
async getAllStockReportData(@Body() req?:any): Promise<CommonResponseModel> {
  try {
    return await this.stocksService.getAllStockReportData(req);
  } catch (error) {
    return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
  }
}

}