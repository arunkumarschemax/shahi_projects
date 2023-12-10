import { Body, Controller, Get, Post } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { AllStocksResponseModel, CommonResponseModel, M3trimsDTO, RackBinPalletsResponse, StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
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
    async getAllStocks(@Body() m3StyleDto?: any): Promise<AllStocksResponseModel> {
        try {
            return await this.stocksService.getAllStocks(m3StyleDto);
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

@Post('/update')
async update(@Body() req: any): Promise<CommonResponseModel> {
  console.log(req,"stock-controll")
  try {
    return await this.stocksService.update(req);
  } catch (error) {
    return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
  }
}
@Post('/getAllTrimStocks')
async getAllTrimStocks(@Body() req: any): Promise<CommonResponseModel> {
  console.log(req,"stock-controll")
  try {
    return await this.stocksService.getAllTrimStocks(req);
  } catch (error) {
    return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
  }
}

@Post('/getBinPalletsWithoutRolls')
async getBinPalletsWithoutRolls(@Body() req: any): Promise<RackBinPalletsResponse> {
  try {
    return await this.stocksService.getBinPalletsWithoutRolls(req);
  } catch (error) {
    return this.applicationExceptionhandler.returnException(RackBinPalletsResponse, error);
  }
}


}