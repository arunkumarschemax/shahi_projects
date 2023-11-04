import { Controller, Get, Post } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { AllStocksResponseModel, CommonResponseModel } from "@project-management-system/shared-models";

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

    @Get("/getAllStocks")
    async getAllStocks(): Promise<AllStocksResponseModel> {
        try {
            return await this.stocksService.getAllStocks();
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(AllStocksResponseModel, error);
        }
    }

}